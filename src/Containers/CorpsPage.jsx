import "./../assets/main.css";
import fon from "./../assets/images/fon.png";
import c111 from "./../assets/images/111.png";
import c222 from "./../assets/images/222.png";
import c333 from "./../assets/images/333.png";
import c444 from "./../assets/images/444.png";
import c555 from "./../assets/images/555.png";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import Grid from "@mui/material/Grid";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { forwardRef, useEffect, useState } from "react";

import Modal from "@mui/material/Modal";

import { Button } from "@mui/material";
const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
function CorpsPage() {
  const [open, setOpen] = useState(false);
  const [activeCorps, setCorps] = useState(1);
  const [processedData, setData] = useState(new Map());
  const [openPopup, setOpenPopup] = useState(false);
  const [popUpdata,setDataPopup] = useState({});
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClickOnCalendarEvent = (data) => {
    setOpenPopup(true);
    setDataPopup(data)
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: { md: "654px", sm: "550px", xs: "90%" },
    bgcolor: "white",
    borderRadius: "20px",
    boxShadow: 24,
    pt: 1,
    px: 1,
    pb: 1,
  };

  const handleClosePopUp=()=>{
    setOpenPopup(false);
  }

  const corpsImages = [
    {
      id: 1,
      clName: "korpus1",
      elem: c111,
    },
    {
      id: 2,
      clName: "korpus2",
      elem: c222,
    },
    {
      id: 3,
      clName: "korpus3",
      elem: c333,
    },
    {
      id: 4,
      clName: "korpus4",
      elem: c444,
    },
    {
      id: 5,
      clName: "korpus5",
      elem: c555,
    },
  ];

  const handleCorpusOnClick = (number) => {
    setCorps(number);
    handleOpen();
  };

  useEffect(() => {
    makeRequest();
  }, []);

  useEffect(() => {
    if (activeCorps) {
      setCorps(activeCorps);
      console.log(activeCorps);
    }
  }, [activeCorps]);

  function getMapOfEvents(param) {
    const mapByCorpus = param.reduce((map, obj) => {
      const {
        date,
        description,
        faculty,
        name,
        time,
        university_building,
        url,
      } = obj;
      if (!map.has(university_building)) {
        map.set(university_building, [obj]); // Создаем новый массив для данного date
      } else {
        map.get(university_building).push(obj); // Добавляем объект в существующий массив
      }
      return map;
    }, new Map());

    // Пример использования

    const keys = Array.from(mapByCorpus.keys());

    keys.forEach((key) => {
      const value = mapByCorpus.get(key);
      value.sort((a, b) => new Date(a.date) - new Date(b.date)); // Сортировка по возрастанию
      mapByCorpus.set(key, value); // Обновляем значение в Map
    });
  

    return mapByCorpus;
  }

  async function makeRequest() {
    try {
      const response = await axios.get("http://127.0.0.1:8000/map");
      setData(getMapOfEvents(response.data));
     
    } catch (error) {
      console.log("error", error);
    }
  }

  return (
    <Box>
      <div className="container">
        <img className="fon" src={fon} />
        {corpsImages.map((item, index) => (
          <img
            className={item.clName}
            key={index}
            src={item.elem}
            onClick={(e) => handleCorpusOnClick(item.id)}
          />
        ))}
      </div>

      <div>
        <Dialog
          fullScreen
          open={open}
          onClose={handleClose}
          TransitionComponent={Transition}
          sx={{ width: "100%" }}
        >
          <AppBar
            sx={{
              position: "relative",
              backgroundColor: "#1D3364",
              overflow: "hidden",
              width: "100%",
            }}
          >
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={handleClose}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
              <Box>
                <Typography
                  sx={{ ml: 2, flex: 1 }}
                  variant="h6"
                  component="div"
                >
                  Программа
                </Typography>
              </Box>
            </Toolbar>
          </AppBar>
          <Box
            sx={{ p: { xs: 2, md: 5 }, display: "flex", flexDirection: "row" }}
          >
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {processedData.has(activeCorps)
                ? processedData.get(activeCorps).map((corpEvent, index) => (
                    <Button>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          width: "auto",
                        }}
                        onClick={(event) => {
                          handleClickOnCalendarEvent(corpEvent);
                        }}
                      >
                        <Typography
                          variant="h6"
                          gutterBottom
                          sx={{ color: "black" }}
                        >
                          <strong>{corpEvent.date}</strong>
                        </Typography>
                        <Typography
                          variant="h6"
                          gutterBottom
                          sx={{ ml: "30px", width: "auto", color: "black" }}
                        >
                          {corpEvent.name}
                        </Typography>
                      </Box>
                    </Button>
                  ))
                :  <Typography variant="h6" gutterBottom>
                Ближайших мероприятий не запланировано
              </Typography>}
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-start",
                height: "100%",
                overflow: "hidden",
                m: 0,
                p: 0,
              }}
            >
              <Box>
                <img
                  style={{ width: "200px", height: "200px" }}
                  src={corpsImages.find((obj) => obj.id === activeCorps).elem}
                />
              </Box>
            </Box>
          </Box>
        </Dialog>
      </div>

      {/* <div className="programa">
            <div className="programa-info">
            <div className="programa-text">  <Typography variant="h6" gutterBottom>
        Программа
      </Typography></div>
            </div>
        </div> */}

<Modal open={openPopup} onClose={handleClosePopUp}>
        <Box sx={{ ...style }}>
          <Grid container spacing={2}>
            <Grid item xs={10} sm={11}>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "flex-start",
                  backgroundColor: "yellow",
                  height: "auto",
                  borderRadius: "20px",
                  p: "15px",
                  boxSizing: "border-box",
                }}
              >
                <Typography variant="h4" sx={{ color: "white" }}>
                  <strong>{popUpdata.name}</strong>
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={2} sm={1}>
              <Box
                sx={{
                  height: "100%",

                  pl: "10px",
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "flex-end",
                }}
              >
                <IconButton
                  onClick={handleClosePopUp}
                  sx={{
                    width: "40px",
                    height: "40px",
                    bgcolor: "#EAEBEA",
                    borderRadius: "10px",
                  }}
                >
                  <CloseIcon />
                </IconButton>
              </Box>
            </Grid>

            <Grid item xs={11}>
              <Grid container spacing={2}>
                <Grid item xs={9}>
                  <Box
                    sx={{
                      backgroundColor: "#EAEBEA",
                      borderRadius: "20px",
                      p: "14px",
                      boxSizing: "border-box",
                    }}
                  >
                    <Typography variant="body2">
                      {popUpdata.description}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={3}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Box
                      sx={{
                        p: "6px",
                        backgroundColor: "#EAEBEA",
                        borderRadius: "10px",
                        marginBottom: "9px",
                        display:"flex",
                        justifyContent:"center"
                      }}
                    >
                      <Typography variant="body2">{popUpdata.date}</Typography>
                    </Box>
                    <Box
                      sx={{
                        p: "6px",
                        backgroundColor: "#EAEBEA",
                        borderRadius: "10px",
                        marginBottom: "9px",
                        display:"flex",
                        justifyContent:"center"
                      }}
                    >
                      <Typography variant="body2">{popUpdata.time}</Typography>
                    </Box>
                    <Box
                      sx={{
                        p: "6px",
                        backgroundColor: "#EAEBEA", 
                        borderRadius: "10px",
                        marginBottom: "9px",
                       
                      }}
                    >
                      <Typography variant="body2">Корпус: {popUpdata.university_building}</Typography>
                    </Box>
                    <Box
                      sx={{
                        p: "6px",
                        backgroundColor: "#EAEBEA", 
                        borderRadius: "10px",
                        overflow:"hidden",
               
                      }}
                    >
                      <Typography variant="body2">Ссылки: {<br/>} <a  href={popUpdata.url} > {popUpdata.url}</a></Typography>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={1}></Grid>
          </Grid>
        </Box>
      </Modal>


    </Box>
  );
}

export default CorpsPage;
