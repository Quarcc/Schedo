import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Hamburger from 'hamburger-react';

export default function BurgerDrawer({ items }) {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerList = items.map((item, index) => {
    return (<>
      <ListItem key={item.header} disablePadding className="w-28">
        <ListItemButton onClick={item.onClick}>
          <ListItemIcon>
            {item.icon}
          </ListItemIcon>
          <ListItemText primary={item.header} />
        </ListItemButton>
      </ListItem>
      <Divider /></>
    );
  })



  return (
    <div>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        <div className="h-16" />
        {DrawerList}
      </Drawer>
      <Button onClick={toggleDrawer(true)}>
        <Hamburger className="position" color="#7C7D84" />
      </Button>

    </div>
  );
}