import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useState } from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { useEffect } from "react";
import { List } from "@mui/material";
import { ListItem } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Modal from "@mui/material/Modal";

import BottomNavigation from "@mui/material/BottomNavigation";

const weekDaysNames = ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ", "ВС"];

const getFacultyColor = {
  ФКП: "#674788",
  ФИТУ: "#2A6195",
  ПРОФКОМ: "#4E9CA7",
  ФКСИС: "#478836",
  ФРЭ: "#E0C42F",
  ИЭФ: "#EB7C3E",
  ФИБ: "#E85454",
  ВФ: "#65574F",
};

const data = {
  name: "мероприятие 1",
  date: "15.09.2024",
  time: "15.00",
  duration: "4",
  university_building: "1",
  description: "длинное описание",
  faculty: "ФКП",
};

function MonthPage() {
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [days, setDays] = useState([]);
  const [processedData, setData] = useState([data]); //добавить сортировку полученных данных с сервера
  const [value, setValue] = useState(0);

  const [modalData, setModalData] = useState({});

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  function checkCurrentDate(date) {
    return date === new Date().getDate() && month===new Date().getMonth()+1 && year === new Date().getFullYear() ? "#00BFFF" : "none";
  }

  async function makeRequest() {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v1/auth/register"
      );
      //  setData({})
    } catch (error) {
      console.log("error", error);
    }
  }
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: { md: "654px", sm: "550px", xs: "90%" },
    bgcolor: "white",
    border: "none",
    borderRadius: "20px",
    boxShadow: 24,
    pt: 1,
    px: 1,
    pb: 1,
  };

  useEffect(() => {
    const date = new Date(year, month, 0);
    const daysInMonth = date.getDate();
    const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    setDays(daysArray);
  }, [month, year]);

  const monthNames = [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь",
  ];
  const decreaseMonth = () => {
    setMonth((prevMonth) => {
      if (prevMonth === 1) {
        setYear((prevYear) => prevYear - 1);
        return 12;
      } else {
        return prevMonth - 1;
      }
    });
  };
  const increaseMonth = () => {
    setMonth((prevMonth) => {
      if (prevMonth === 12) {
        setYear((prevYear) => prevYear + 1);
        return 1;
      } else {
        return prevMonth + 1;
      }
    });
  };

  const handleToday = () => {
    setMonth(new Date().getMonth() + 1);
    setYear(new Date().getFullYear());
  };

  const handleClickOnCalendarEvent = (data) => {
    console.log(data);
    handleOpen();
  };

  return (
    <Box sx={{ width: "100vw" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          position: { xs: "fixed", sm: "fixed", md: "relative" },
          top: { xs: "60px", md: "0" },
          left: { xs: "0", md: "0" },
          width: "100%",
          zIndex: "10",
          maxWidth: { xs: "none", md: "80%" },
          margin: "0 auto",
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "100%",
            alignItems: "center",
            justifyContent: "space-between",
            margin: "0 auto",
            marginTop: 3,
            p: "0",
            bgcolor: "#FFFFFF",
            borderRadius: "10px",
            height: "50px",
            paddingLeft: "5px",
            paddingRight: "5px",
            boxSizing: "border-box",
          }}
        >
          <Box
            sx={{
              bgcolor: "#C4D0EA",
              borderRadius: "100%",
              height: "40px",
              width: "40px",
              display: "flex",
              alignItems: "center",
              ml:{xs:2}
            }}
          >
            <IconButton onClick={decreaseMonth}>
              <ArrowBackIosIcon sx={{ marginLeft: "5px" }} />
            </IconButton>
          </Box>
          <Box
            sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
          >
            <Box>
              <Button
                onClick={handleToday}
                sx={{ mr: { xs: 2, sm: 6 }, ml: 1 }}
                variant="outlined"
              >
                Сегодня
              </Button>
            </Box>

            <Typography
              variant="h4"
              component="h4"
              sx={{
                fontSize: { xs: "1.2rem", sm: "2.125rem" },
              }}
            >
              {monthNames[month - 1]} {year}
            </Typography>
          </Box>

          <Box
            sx={{
              bgcolor: "#C4D0EA",
              borderRadius: "100%",
              height: "40px",
              width: "40px",
              display: "flex",
              alignItems: "center",
              mr:{xs:2}
            }}
          >
            <IconButton onClick={increaseMonth}>
              <ArrowForwardIosIcon sx={{ marginRight: "5px" }} />
            </IconButton>
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          maxWidth: "80%",
          minWidth: "1024px",
          flexDirection: "row",
          margin: "0 auto",
          justifyContent: "space-between",
          mt: { md: 2, xs: "60px" },
        }}
      >
        <Grid container spacing={0.3}>
          {weekDaysNames.map((item, index) => (
            <Grid key={index} item xs={1.709999}>
              <Box
                sx={{
                  bgcolor: "#EAEBEA",
                  height: "46px",
                  width: "100%",
                  borderRadius: "10px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography
                  fontWeight={"fontWeightMedium"}
                  key={index}
                  variant="subtitle2"
                  display="block"
                >
                  <strong>{item}</strong>
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box
        sx={{
          display: "flex",
          maxWidth: "80%",
          margin: "0 auto",
          mt: 1,
          minWidth: "1024px",
        }}
      >
        <Grid container spacing={0.3}>
          {days.map((item, index) => (
            <Grid key={index} item xs={1.709999}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                  bgcolor: "#FFFFFF",
                  borderRadius: "10px",
                  minHeight: "20px",

                  overflow: "hidden",
                  maxHeight: "146px",
                }}
              >
                <Box
                  sx={{
                    width: "100%",
                    paddingLeft: "5px",
                  }}
                >
                  <Box
                    sx={{
                     
                      borderRadius: "100%",
                     width:"20px",
                      height:"20px",
                      ml:"-2px",
                  
                      display:"flex",
                      alignItems:"center",
                      justifyContent:"center",
                      backgroundColor: checkCurrentDate(item),
                      zIndex: "100",
                    }}
                  >
                    <Typography variant="button" display="block">
                      <strong>{item}</strong>
                    </Typography>
                  </Box>
                </Box>
                <List
                  sx={{
                    width: "100%",
                    p: 0,
                    position: "relative",
                    overflow: "auto",
                    pt: "5px",
                    mt: "-6px",
                  }}
                >
                  {[0, 1, 2].map((item, index) => (
                    <ListItem
                      key={index}
                      sx={{
                        mt: "-10px",
                        "&:hover": {
                          cursor: "pointer",
                        },
                      }}
                      onClick={(event) => {
                        handleClickOnCalendarEvent(item);
                      }}
                    >
                      <Grid container spacing={1}>
                        <Grid item xs={8}>
                          <Box
                            sx={{
                              width: "100%",
                              height: "auto",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              bgcolor: getFacultyColor.ФКП,
                              borderRadius: "8px",
                              padding: "3px",
                            }}
                          >
                            <Typography
                              variant="subtitle1"
                              sx={{ color: "white" }}
                            >
                              {item}
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={4}>
                          <Box
                            sx={{
                              width: "100%",
                              height: "auto",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              bgcolor: getFacultyColor.ФКП,
                              borderRadius: "8px",
                              padding: "3px",
                            }}
                          >
                            <Typography
                              variant="subtitle1"
                              sx={{ color: "white" }}
                            >
                              {item}
                            </Typography>
                          </Box>
                        </Grid>
                      </Grid>
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box
        sx={{
          position: "fixed",
          bottom: "0",
          left: "auto",
          right: "auto",
          width: "100%",
          display: "flex",
          justifyContent: "center",
        
        }}
      >
        <BottomNavigation sx={{ pl: 2, borderRadius: "10px",   pb:"10px", height:"auto" }}>
          <Box sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
            {Object.keys(getFacultyColor).map((item, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "nowrap",
                  alignItems: "center",
                  mr: 3,
                  mt: "5px",
                }}
              >
                <Box
                  sx={{
                    bgcolor: Object.values(getFacultyColor)[index],
                    height: "25px",
                    width: "25px",
                    mr: 1,
                    borderRadius: "100%",
                  }}
                ></Box>
                <Box sx={{}}>
                  <Typography variant="subtitle2">{item}</Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </BottomNavigation>
      </Box>
      <Modal open={open} onClose={handleClose}>
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
                  <strong>Хакатон</strong>
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
                  onClick={handleClose}
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
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Officiis possimus magnam vel illum quod. Quo et iusto
                      recusandae natus, quibusdam excepturi officiis mollitia
                      quia doloremque suscipit pariatur commodi autem. Nostrum!
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
                      }}
                    >
                      <Typography variant="body2">5-8 апреля</Typography>
                    </Box>
                    <Box
                      sx={{
                        p: "6px",
                        backgroundColor: "#EAEBEA",
                        borderRadius: "10px",
                      }}
                    >
                      <Typography variant="body2">5-8 апреля</Typography>
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

export default MonthPage;
