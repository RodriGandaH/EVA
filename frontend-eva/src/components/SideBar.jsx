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

function SideBar({ ejercicios, clickButtonSideBar , userType }) {
   const [open, setOpen] = useState(true);
   const drawerWidth = 200;
  return (
    <div>
        {/* <IconButton onClick={()=>setOpen(true)}>
            <FiList/>
        </IconButton> */}
        <Button onClick={()=>setOpen(true) }>
         <FiList size={'25'}/>
        </Button>
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
               {
               ejercicios.map((ejercicio, index) => (
                  <ListItem key={index} disablePadding>
                     <ListItemButton onClick={()=> clickButtonSideBar(ejercicio.id)}>
                        <ListItemText primary={`Ejercicio Nro ${index + 1}`} />
                     </ListItemButton>
                  </ListItem>
               ))
               }
                <Divider />
              {
               userType === 'teacher' && 
               <>
                  <ListItem disablePadding style={{ backgroundColor:'#1565c0',color:'white'}}>
                     <ListItemButton onClick={() => clickButtonSideBar(-1)}>
                        <ListItemText primary={'Crear Ejercicio'} />
                     </ListItemButton>
                  </ListItem>
                     <Divider />
                  
                  
                  <a href={ScormPackage} target="_blank" download style={{ textDecoration: 'none',color:'white' }}>
                     <ListItemButton style={{backgroundColor:'green'}}>
                        <ListItemText primary={'Exportar Scorm'}/>
                     </ListItemButton>
                  </a>
               </>
               }
           </List>
        </Drawer>
        
    </div>
  )
}

export default SideBar