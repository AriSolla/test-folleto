import { Box, Container, Grid, Typography, IconButton } from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import EmailIcon from "@mui/icons-material/Email";
import FacebookIcon from "@mui/icons-material/Facebook";
import XIcon from "@mui/icons-material/X";
import InstagramIcon from "@mui/icons-material/Instagram";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useFlyer } from "../../context/FlyerContext";

const Footer = () => {
  const { business } = useFlyer();
  const daysOfWeek = [
    "Lun",
    "Mar",
    "Mié",
    "Jue",
    "Vie",
    "Sáb",
    "Dom",
  ];

  const buildScheduleMap = () => {
    const map: Record<string, { open: string[]; close: string[] }> = {};

    business.working_hour.forEach((item: any) => {
      item.days.forEach((day: string) => {
        map[day] = {
          open: item.open,
          close: item.close,
        };
      });
    });

    return map;
  };

  const scheduleMap = buildScheduleMap();
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: "auto",
        backgroundColor: (theme) => theme.palette.grey[800],
        color: (theme) => theme.palette.common.white,
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={2} justifyContent="space-between">
          {/* Company Info */}
          <Grid size={{ xs: 12, sm: 3 }}>
            <Typography variant="h6" gutterBottom>
              {business.name}
            </Typography>
            <Box display="flex" alignItems="center" mt={1}>
              <Typography variant="body2">
                © 2024 Your Company. All rights reserved.
              </Typography>
            </Box>
            <Box display="flex" alignItems="stretch" mt={1}>
              <LocationOnIcon fontSize="small" sx={{ ml: "-5px" }} />
              <Typography variant="body2" sx={{ ml: "1px" }}>
                {business.address}
              </Typography>
            </Box>
          </Grid>

          {/* Links */}
          <Grid size={{ xs: 12, sm: 3 }}>
            <Typography variant="h6" gutterBottom>
              Contáctenos
            </Typography>
            <Box display="flex" alignItems="center" mt={1}>
              <WhatsAppIcon fontSize="small" sx={{ mr: 1 }} />
              <Typography variant="body2">{business.phone}</Typography>
            </Box>
            <Box display="flex" alignItems="center" mt={1}>
              <EmailIcon fontSize="small" sx={{ mr: 1 }} />
              <Typography variant="body2">{business.email}</Typography>
            </Box>
          </Grid>

          {/* Social Media */}
          <Grid size={{ xs: 12, sm: 3 }}>
            <Typography variant="h6" gutterBottom>
              Nuestras redes
            </Typography>
            <Box>
              {business?.socialMedia?.facebook && (
                <IconButton
                  href={business.socialMedia.facebook}
                  color="inherit"
                  aria-label="Facebook"
                  sx={{ p: 0.5 }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FacebookIcon />
                </IconButton>
              )}
              {business?.socialMedia?.x && (
                <IconButton
                  href={business.socialMedia.x}
                  color="inherit"
                  aria-label="Twitter"
                  sx={{ p: 0.5 }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <XIcon />
                </IconButton>
              )}
              {business?.socialMedia?.instagram && (
                <IconButton
                  href={business.socialMedia.instagram}
                  color="inherit"
                  aria-label="Instagram"
                  sx={{ p: 0.5 }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <InstagramIcon />
                </IconButton>
              )}
            </Box>
          </Grid>

            {/* Horarios */}
          <Grid size={{ xs: 12, sm: 3 }}>    
            <Typography variant="h6" gutterBottom>
              Horarios
            </Typography>
            <Box>
              <Box>
                {daysOfWeek.map((day) => {
                  const schedule = scheduleMap[day.slice(0, 3)]; // usamos abreviatura "Lun", "Mar", etc.
                  return (
                    <Box key={day} display="flex" alignItems="center">
                      <Typography
                        variant="body2"
                        sx={{ fontWeight: 600,mr:'2%', width: "15%" }}
                      >
                        {day}:
                      </Typography>
                      <Typography variant="body2">
                        {schedule
                          ? schedule.open
                              .map(
                                (openTime, i) =>
                                  `${openTime} - ${schedule.close[i]}`
                              )
                              .join(" | ")
                          : "Cerrado"}
                      </Typography>
                    </Box>
                  );
                })}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
