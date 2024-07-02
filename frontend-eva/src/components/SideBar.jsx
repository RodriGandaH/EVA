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
import { useState, useEffect } from "react"
import ScormPackage from '../../public/scorm-project.zip'

function SideBar({ ejercicios, clickButtonSideBar , userType }) {
   const [open, setOpen] = useState(true);
   const [selecteds, setSelecteds] = useState([])
   
   useEffect(() => {
      if(selecteds.length <= 0) setSelecteds(new Array(ejercicios.length).fill(false));
   }, [ejercicios])

   
   
   const drawerWidth = 200;

   const handleSelecteds = (index) => {
      setSelecteds(selecteds.map((flag,i)=>index === i ? true : false));
   }
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
                     <ListItemButton onClick={()=>{ clickButtonSideBar(ejercicio.id); handleSelecteds(index)}} disabled={ejercicio?.status === 'incomplete'} selected = {selecteds[index]}>
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
                       <ListItemButton onClick={() => { clickButtonSideBar(-1) ;  handleSelecteds(-1)}}>
                        <ListItemText primary={'Crear Ejercicio'} />
                     </ListItemButton>
                  </ListItem>
                     <Divider />
                  
                  
                  <a href={ScormPackage} target="_blank" download style={{ textDecoration: 'none',color:'white' }}>
                       <ListItemButton style={{ backgroundColor: 'green' }} onClick={() =>  handleSelecteds(-1)}>
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