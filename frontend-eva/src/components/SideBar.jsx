import { 
   Drawer,
   List,
   Divider,
   ListItem,
   ListItemText,
   ListItemButton,
   Button,
   Box,
   IconButton,
} from "@mui/material"
import { FaChevronLeft } from "react-icons/fa";
import { FiList } from "react-icons/fi";
import { useState } from "react"
import ScormPackage from '../../public/scorm-project.zip'

function SideBar({ ejercicios, clickButtonSideBar = () => { }, userType }) {
   const [open, setOpen] = useState(true);
   console.log('userType',userType);
   const drawerWidth = 240;
  return (
    <div>
        <IconButton onClick={()=>setOpen(true)}>
            <FiList/>
        </IconButton>
        <Drawer
           sx={{
            background:'gray',
              width: drawerWidth,
              flexShrink: 0,
              '& .MuiDrawer-paper': {
                 width: drawerWidth,
                 boxSizing: 'border-box',
              },
           }}
           variant="persistent"
           anchor="left"
           open={open}
        >
           <Button onClick={() => setOpen(false)}>
              <FaChevronLeft />
           </Button>
           <Divider />
           <List>
              {ejercicios.map((ejercicio, index) => (
                 <ListItem key={index} disablePadding>
                    <ListItemButton onClick={()=> clickButtonSideBar(ejercicio.id)}>
                       <ListItemText primary={`Ejercicio Nro ${index + 1}`} />
                    </ListItemButton>
                 </ListItem>
              ))}
           </List>
           <Divider />
           {userType === 'teacher' &&

              <a href={ScormPackage} target="_blank" download style={{ textDecoration: 'none',color:'white' }}>
                  <ListItemButton style={{backgroundColor:'green'}}>
                     Exportar Curso en Scorm
                  </ListItemButton>
              </a>
           }
        </Drawer>
        
    </div>
  )
}

export default SideBar