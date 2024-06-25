import React, { useEffect, useState } from 'react';
import { Box, Container, Typography, IconButton, Dialog, DialogTitle, DialogContent, TextField, DialogActions, FormControl, InputLabel, Select, MenuItem, Chip, Avatar } from '@mui/material';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { apiUrl } from '../../utils/Constants';
import authAxios from '../../utils/authAxios';
import { toast } from 'react-toastify';
import Loader from '../../components/Loader/Loader';
import { jsPDF } from 'jspdf';
import { Check, Clear } from '@material-ui/icons';

const InventoryItems = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };


  const getItems = async () => {
    try {
      const res = await authAxios.get(`${apiUrl}/item/all-products`);
      setItems(res.data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 404) {
        toast.error('Products not found');
      } else {
        toast.error(error.response?.data?.message || 'An error occurred');
      }
    }
  };

  useEffect(() => {
    getItems();
  }, []);

  const filteredItems = items.filter(item =>
    item.itemName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const generatePDF = () => {
    const doc = new jsPDF();

    // Set Header
    const header = 'Inventory';
    const textWidth = doc.getStringUnitWidth(header) * doc.internal.getFontSize() / doc.internal.scaleFactor;
    const pageWidth = doc.internal.pageSize.getWidth();
    const x = (pageWidth - textWidth) / 2;

    // Function to add table content for each page
    const addPageContent = (start, end) => {
      const tableRows = [];
      items.slice(start, end).forEach((row, index) => {
        const rowData = [
          row.itemName,
          row.category,
          row.quantity,
          row.price,
        ];
        tableRows.push(rowData);
      });

      doc.autoTable({
        head: [['Name', 'Category', 'Quantity', 'Price']],
        body: tableRows,
        startY: 20,
      });
    };

    let startRow = 0;
    let endRow = rowsPerPage;

    // Add pages until all rows are added
    while (startRow < items.length) {
      addPageContent(startRow, endRow);
      startRow = endRow;
      endRow = Math.min(startRow + rowsPerPage, items.length);
      if (endRow < items.length) {
        doc.addPage();
      }
    }

    // Add Header to each page
    for (let i = 1; i <= doc.getNumberOfPages(); i++) {
      doc.setPage(i);
      doc.text(x, 10, header);
    }

    // Save the PDF
    doc.save('inventory.pdf');
  };


  return (
    <Container maxWidth={'800px'}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          marginBottom: 2,
        }}
      >
        <InputBase
          placeholder="  Search…"
          sx={{ ml: 1, width: 200, border: '1px solid #ccc', borderRadius: 3 }}
          onChange={handleSearchChange}
        />
        <IconButton sx={{ p: '10px', marginRight: 2 }} aria-label="search">
          <SearchIcon />
        </IconButton>
        <Button variant="outlined" color="primary" onClick={generatePDF}>
          Generate PDF
        </Button>
      </Box>
      <Paper sx={{ width: '100%', marginTop: 2 }}>
        {
          !isLoading ? <>
            <TableContainer sx={{ maxHeight: '100%' }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Name</TableCell>
                    <TableCell align="center">Category</TableCell>
                    <TableCell align="center">Quantity</TableCell>
                    <TableCell align="center">Price</TableCell>
                    <TableCell align="center">Image</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredItems.map((row) => (
                    <TableRow
                      key={row.itemName}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell align="center" component="th" scope="row">
                        {row.itemName}
                      </TableCell>
                      <TableCell align="center">{row.category}</TableCell>
                      <TableCell align="center">
                        {row.quantity > 20 ?
                          <Chip color="success" icon={<Check />} label={row.quantity} /> :
                          <Chip color="warning" icon={<Clear />} label={row.quantity} />
                        }
                      </TableCell>
                      <TableCell align="center">{row.price}</TableCell>
                      <TableCell align="center">
                        <img
                          src={row.img}
                          alt={row.productName}
                          style={{ width: '35px', height: '35px', margin: 'auto' }}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </> : <Loader />}
      </Paper>
    </Container>
  );
};

export default InventoryItems;
