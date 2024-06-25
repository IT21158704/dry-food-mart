import React, { useState, useEffect } from 'react';
import { apiUrl } from '../../utils/Constants';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export default function Home() {
  const [suppliers, setSuppliers] = useState([]);
  const [filteredSuppliers, setFilteredSuppliers] = useState([]);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [formData, setFormData] = useState({
    companyName: '',
    name: '',
    mobile: '',
    email: '',
    address: '',
    pDescription: ''
  });
  const [openDialog, setOpenDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [addSupplierDialogOpen, setAddSupplierDialogOpen] = useState(false);
  const [addFormData, setAddFormData] = useState({
    companyName: '',
    name: '',
    mobile: '',
    email: '',
    address: '',
    pDescription: ''
  });

  useEffect(() => {
    fetchSuppliers();
  }, []);

  useEffect(() => {
    const results = suppliers.filter(supplier =>
      supplier.companyName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredSuppliers(results);
  }, [searchTerm, suppliers]);

  async function fetchSuppliers() {
    try {
      const response = await fetch(`${apiUrl}/supplier/`);
      const data = await response.json();
      setSuppliers(data);
    } catch (error) {
      console.error('Error fetching suppliers:', error);
    }
  }

  async function fetchAndUpdateSupplier(id) {
    try {
      const response = await fetch(`${apiUrl}/supplier/${id}`);
      const data = await response.json();
      setSelectedSupplier(data);
      setFormData(data);
      setOpenDialog(true);
    } catch (error) {
      console.error('Error fetching supplier:', error);
    }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddChange = (e) => {
    setAddFormData({ ...addFormData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${apiUrl}/supplier/${selectedSupplier._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        setOpenDialog(false);
        fetchSuppliers();
        toast.success('Supplier updated successfully');
      } else {
        console.error('Failed to update supplier');
      }
    } catch (error) {
      console.error('Error updating supplier:', error);
    }
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${apiUrl}/supplier/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(addFormData)
      });
      if (response.ok) {
        setAddSupplierDialogOpen(false);
        fetchSuppliers();
        toast.success('Supplier added successfully');
      } else {
        console.error('Failed to add supplier');
      }
    } catch (error) {
      console.error('Error adding supplier:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${apiUrl}/supplier/${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        fetchSuppliers();
        toast.success('Supplier deleted successfully');
      } else {
        console.error('Failed to delete supplier');
      }
    } catch (error) {
      console.error('Error deleting supplier:', error);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // const generatePDF = () => {
  //     const doc = new jsPDF();
  //     doc.text('Supplier List', 10, 10);
  //     doc.autoTable({ html: '#supplierTable' });
  //     doc.save('supplier_list.pdf');
  // };

  const generatePDF = () => {
    const doc = new jsPDF();
    // Assuming doc is your PDF document object
    var pageWidth = doc.internal.pageSize.getWidth();
    var textWidth = doc.getStringUnitWidth('Supplier List') * doc.internal.getFontSize() / doc.internal.scaleFactor;

    // Calculate the x-coordinate to center the text
    var x = (pageWidth - textWidth) / 2;

    // Place the text at the calculated position
    doc.text('Supplier List', x, 10);


    const table = document.querySelector('#supplierTable').cloneNode(true);

    const actionColumnIndex = Array.from(table.querySelectorAll('thead th')).findIndex(th => th.textContent.trim().toLowerCase() === 'actions');
    if (actionColumnIndex !== -1) {
      const tableRows = table.querySelectorAll('tr');
      tableRows.forEach(row => {
        const cells = row.querySelectorAll('th, td');
        if (cells.length > actionColumnIndex) {
          row.removeChild(cells[actionColumnIndex]);
        }
      });
    }

    doc.autoTable({ html: table });
    doc.save('supplier_list.pdf');
  };

  return (
    <>
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold mb-4">Suppliers List</h1>
        <div className="flex flex-wrap items-center justify-between mb-4">
          <div className="flex mb-4 mr-4">
            <input
              type="text"
              placeholder="search by company name"
              value={searchTerm}
              onChange={handleSearch}
              className="px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>

          <div className="flex mt-4">
            <Button variant="contained" onClick={() => setAddSupplierDialogOpen(true)} className="mr-2">Add Supplier</Button>
            <Button variant="contained" onClick={generatePDF}>Generate PDF</Button>
          </div>

        </div>

        <br></br>
        <table id="supplierTable" className="table-auto w-full rounded-t-lg">
  <thead className="bg-blue-100">
    <tr>
      <th className="px-4 py-2">Company Name</th>
      <th className="px-4 py-2">Supplier Name</th>
      <th className="px-4 py-2">Phone</th>
      <th className="px-4 py-2">Email</th>
      <th className="px-4 py-2">Address</th>
      <th className="px-4 py-2">Product Description</th>
      <th className="px-4 py-2">Actions</th>
    </tr>
  </thead>
  <tbody>
    {filteredSuppliers.map(supplier => (
      <tr key={supplier._id}>
        <td className="border px-4 py-2">{supplier.companyName}</td>
        <td className="border px-4 py-2">{supplier.name}</td>
        <td className="border px-4 py-2">{supplier.mobile}</td>
        <td className="border px-4 py-2">{supplier.email}</td>
        <td className="border px-4 py-2">{supplier.address}</td>
        <td className="border px-4 py-2">{supplier.pDescription}</td>
        <td className="border px-4 py-2">
          <button className="mr-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => fetchAndUpdateSupplier(supplier._id)}>Update</button>
          <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleDelete(supplier._id)}>Delete</button>
        </td>
      </tr>
    ))}
  </tbody>
</table>




        <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
          <DialogTitle>Update Supplier</DialogTitle>
          <DialogContent>
            <form onSubmit={handleSubmit}>
              <TextField
                id="companyName"
                name="companyName"
                label="Company Name"
                value={formData.companyName}
                onChange={handleChange}
                fullWidth
                margin="dense"
                required
              />
              <TextField
                id="name"
                name="name"
                label="Supplier Name"
                value={formData.name}
                onChange={handleChange}
                fullWidth
                margin="dense"
                required
              />
              <TextField
                id="mobile"
                name="mobile"
                label="Phone"
                value={formData.mobile}
                onChange={handleChange}
                fullWidth
                margin="dense"
                required
              />
              <TextField
                id="email"
                name="email"
                label="Email"
                value={formData.email}
                onChange={handleChange}
                fullWidth
                margin="dense"
                required
              />
              <TextField
                id="address"
                name="address"
                label="Address"
                value={formData.address}
                onChange={handleChange}
                fullWidth
                margin="dense"
                required
              />
              <TextField
                id="pDescription"
                name="pDescription"
                label="Product Description"
                value={formData.pDescription}
                onChange={handleChange}
                fullWidth
                margin="dense"
                required
              />
              <DialogActions>
                <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
                <Button type="submit" variant="contained" color="primary">Update Supplier</Button>
              </DialogActions>
            </form>
          </DialogContent>
        </Dialog>

        <Dialog open={addSupplierDialogOpen} onClose={() => setAddSupplierDialogOpen(false)}>
          <DialogTitle>Add Supplier</DialogTitle>
          <DialogContent>
            <form onSubmit={handleAddSubmit}>
              <TextField
                id="companyName"
                name="companyName"
                label="Company Name"
                value={addFormData.companyName}
                onChange={handleAddChange}
                fullWidth
                margin="dense"
                required
              />
              <TextField
                id="name"
                name="name"
                label="Supplier Name"
                value={addFormData.name}
                onChange={handleAddChange}
                fullWidth
                margin="dense"
                required
              />
              <TextField
                id="mobile"
                name="mobile"
                label="Phone"
                value={addFormData.mobile}
                onChange={handleAddChange}
                fullWidth
                margin="dense"
                required
              />
              <TextField
                id="email"
                name="email"
                label="Email"
                value={addFormData.email}
                onChange={handleAddChange}
                fullWidth
                margin="dense"
                required
              />
              <TextField
                id="address"
                name="address"
                label="Address"
                value={addFormData.address}
                onChange={handleAddChange}
                fullWidth
                margin="dense"
                required
              />
              <TextField
                id="pDescription"
                name="pDescription"
                label="Product Description"
                value={addFormData.pDescription}
                onChange={handleAddChange}
                fullWidth
                margin="dense"
                required
              />
              <DialogActions>
                <Button onClick={() => setAddSupplierDialogOpen(false)}>Cancel</Button>
                <Button type="submit" variant="contained" color="primary">Add Supplier</Button>
              </DialogActions>
            </form>
          </DialogContent>
        </Dialog>

        <ToastContainer />
      </div>
    </>
  );
}
