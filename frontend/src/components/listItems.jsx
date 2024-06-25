import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { Link } from 'react-router-dom';
import { Fastfood, Home, LocalBar, Payment, ShoppingCart, Store, StoreMallDirectory, Whatshot } from '@material-ui/icons';
import ReviewsIcon from '@mui/icons-material/Reviews';
import { DeliveryDining, Mail, ManageAccounts, Newspaper, RateReview, ShoppingBag } from '@mui/icons-material';
import { Rating } from '@mui/material';

export const adminListItems = (
  <React.Fragment>
    <Link to={'/admin/home'}>
      <ListItemButton>
        <ListItemIcon>
          <Home />
        </ListItemIcon>
        <ListItemText primary="Home" />
      </ListItemButton>
    </Link>
    <Link to={'/admin/Managers'}>
      <ListItemButton>
        <ListItemIcon>
          <ManageAccounts />
        </ListItemIcon>
        <ListItemText primary="Customers" />
      </ListItemButton>
    </Link>
    <Link to={'/admin/newsMng'}>
      <ListItemButton>
        <ListItemIcon>
          <Newspaper />
        </ListItemIcon>
        <ListItemText primary="Manage News Feed" />
      </ListItemButton>
    </Link>
  </React.Fragment>
);

export const customerListItems = (
  <React.Fragment>
  <Link to={'/customer'}>
    <ListItemButton>
      <ListItemIcon>
        <Home />
      </ListItemIcon>
      <ListItemText primary="Home" />
    </ListItemButton>
  </Link>
  <Link to={'/customer/store'}>
    <ListItemButton>
      <ListItemIcon>
        <StoreMallDirectory />
      </ListItemIcon>
      <ListItemText primary="Store" />
    </ListItemButton>
  </Link>
  <Link to={'/customer/orders'}>
    <ListItemButton>
      <ListItemIcon>
        <ShoppingBag />
      </ListItemIcon>
      <ListItemText primary="Orders" />
    </ListItemButton>
  </Link>
  <Link to={'/customer/cart'}>
    <ListItemButton>
      <ListItemIcon>
        <ShoppingCart />
      </ListItemIcon>
      <ListItemText primary="Cart" />
    </ListItemButton>
  </Link>
  <Link to={'/customer/review'}>
    <ListItemButton>
      <ListItemIcon>
        <ReviewsIcon />
      </ListItemIcon>
      <ListItemText primary="Review" />
    </ListItemButton>
  </Link>
  <Link to={'/customer/newsfeed'}>
    <ListItemButton>
      <ListItemIcon>
        <Newspaper />
      </ListItemIcon>
      <ListItemText primary="News Feed" />
    </ListItemButton>
  </Link>
  </React.Fragment>
);

export const supplierListItems = (
  <React.Fragment>
  <Link to={'/supplier'}>
    <ListItemButton>
      <ListItemIcon>
        <Home />
      </ListItemIcon>
      <ListItemText primary="Home" />
    </ListItemButton>
  </Link>
  <Link to={'/supplier/items'}>
    <ListItemButton>
      <ListItemIcon>
        <ShoppingBag />
      </ListItemIcon>
      <ListItemText primary="Goods" />
    </ListItemButton>
  </Link>
  <Link to={'/supplier/OrderGoods'}>
    <ListItemButton>
      <ListItemIcon>
        <Mail />
      </ListItemIcon>
      <ListItemText primary="Order Goods" />
    </ListItemButton>
  </Link>
  </React.Fragment>
);

export const inventoryListItems = (
  <React.Fragment>
  <Link to={'/inventory'}>
    <ListItemButton>
      <ListItemIcon>
        <Home />
      </ListItemIcon>
      <ListItemText primary="Home" />
    </ListItemButton>
  </Link>
  </React.Fragment>
);

export const orderListItems = (
  <React.Fragment>
  <Link to={'/order'}>
    <ListItemButton>
      <ListItemIcon>
        <Home />
      </ListItemIcon>
      <ListItemText primary="Home" />
    </ListItemButton>
  </Link>
  </React.Fragment>
);

export const newsListItems = (
  <React.Fragment>
  <Link to={'/news'}>
    <ListItemButton>
      <ListItemIcon>
        <Home />
      </ListItemIcon>
      <ListItemText primary="Home" />
    </ListItemButton>
  </Link>
  </React.Fragment>
);



export const deliveryListItems = (
  <React.Fragment>
  <Link to={'/delivery'}>
    <ListItemButton>
      <ListItemIcon>
        <Home />
      </ListItemIcon>
      <ListItemText primary="Home" />
    </ListItemButton>
  </Link>
  <Link to={'/delivery/addDriver'}>
    <ListItemButton>
      <ListItemIcon>
        <DeliveryDining />
      </ListItemIcon>
      <ListItemText primary="Manage Drivers" />
    </ListItemButton>
  </Link>
  </React.Fragment>
);

export const staffListItems = (
  <React.Fragment>
  <Link to={'/staff'}>
    <ListItemButton>
      <ListItemIcon>
        <Home />
      </ListItemIcon>
      <ListItemText primary="Manage Staff" />
    </ListItemButton>
  </Link>
  <Link to={'/staff/salary'}>
    <ListItemButton>
      <ListItemIcon>
        <Payment />
      </ListItemIcon>
      <ListItemText primary="Salary" />
    </ListItemButton>
  </Link>
  </React.Fragment>
);


export const feedbackListItems = (
  <React.Fragment>
  <Link to={'/feedback/home'}>
    <ListItemButton>
      <ListItemIcon>
        <Home />
      </ListItemIcon>
      <ListItemText primary="Feedback Home" />
    </ListItemButton>
  </Link>
  </React.Fragment>
);

export const driverListItems = (
  <React.Fragment>
  <Link to={'/driver'}>
    <ListItemButton>
      <ListItemIcon>
        <Home />
      </ListItemIcon>
      <ListItemText primary="Home" />
    </ListItemButton>
  </Link>
  <Link to={'/driver/ratings'}>
    <ListItemButton>
      <ListItemIcon>
        <RateReview />
      </ListItemIcon>
      <ListItemText primary="Ratings" />
    </ListItemButton>
  </Link>
  </React.Fragment>
);

export const guestListItems = (
  <React.Fragment>
  <Link to={''}>
    <ListItemButton>
      <ListItemIcon>
        <Home />
      </ListItemIcon>
      <ListItemText primary="Home" />
    </ListItemButton>
  </Link>
  <Link to={'/items'}>
    <ListItemButton>
      <ListItemIcon>
        <Fastfood />
      </ListItemIcon>
      <ListItemText primary="Items" />
    </ListItemButton>
  </Link>
  <Link to={'/review'}>
    <ListItemButton>
      <ListItemIcon>
        <ReviewsIcon />
      </ListItemIcon>
      <ListItemText primary="Review" />
    </ListItemButton>
  </Link>
  <Link to={'/hotdeals'}>
    <ListItemButton>
      <ListItemIcon>
        <Whatshot />
      </ListItemIcon>
      <ListItemText primary="Hot Deals" />
    </ListItemButton>
  </Link>
  <Link to={'/newsfeed'}>
    <ListItemButton>
      <ListItemIcon>
        <Newspaper />
      </ListItemIcon>
      <ListItemText primary="News Feed" />
    </ListItemButton>
  </Link>
  </React.Fragment>
);