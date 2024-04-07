import  Box  from '@mui/material/Box';
function MainBody({children}) {

    return ( 
    <Box sx={{
        width:"100%",
        height:"calc(100vh - 79px)",
        display:"flex",
       
        bgcolor:"#F5F5F5",
        p:0,
        m:0,
        overflowX:"scroll"
    }}>
            {children}
    </Box> 
    );
}

export default MainBody;