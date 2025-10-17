import React, { useState } from "react";
import {
  Drawer,
  Box,
  Typography,
  Divider,
  List,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Collapse,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

import type { Group, Department } from "../../models/Flyer";
import { useFlyer } from "../../context/FlyerContext";
import { readMeta } from "../../services/metaService";

interface HomeDrawerProps {
  open: boolean;
  onClose: () => void;
  groups: Group[];
  selectedCategory: Group | null;
  selectedDepartment: Department | null;
  onSelectCategory: (group: Group) => void;
  onSelectDepartment: (department: Department | null) => void;
}

export default function HomeDrawer({
  open,
  onClose,
  groups,
  selectedCategory,
  selectedDepartment,
  onSelectCategory,
  onSelectDepartment,
}: HomeDrawerProps) {
  const theme = useTheme();
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const {meta} = useFlyer()
  const [urlBase, setUrlBase] = React.useState<string>("");

  // Seleccionar grupo: se dispara cuando hago click en el texto o ícono del grupo
  const handleGroupClick = (group: Group) => {
    onSelectCategory(group);
    setOpenGroup(null)
    onSelectDepartment(null); // reset departamento al cambiar grupo
    onClose();
  };

  // Seleccionar departamento
  const handleDepartmentClick = (dept: Department, group: Group) => {
    onSelectDepartment(dept);
    onSelectCategory(group)
    setOpenGroup(null)
    onClose();
  };

  // Toggle acordeón (solo cuando clickeo la flecha)
  const handleToggleSubList = (groupId: string, event: React.MouseEvent) => {
    event.stopPropagation(); // evitar que el click "suba" y active handleGroupClick
    setOpenGroup(openGroup === groupId ? null : groupId);
  };

  
      React.useEffect(() => {
        const fetchUrlMeta = async () => {
          let metaData: any = await readMeta();
          if(!metaData) metaData = meta
          setUrlBase(metaData.logo_image);
        };
        fetchUrlMeta();
      }, []);

  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
      <Box
        sx={{
          width: 250,
          backgroundColor: theme.palette.grey[100],
          height: "100%",
        }}
      >
        <Box sx={{ backgroundColor: theme.palette.primary.main, p: 2 }}>
          <Typography variant="h6" color="white">
            Categorías
          </Typography>
        </Box>

        <Divider sx={{ backgroundColor: "#fff", mb: 1 }} />

        <List>
          {groups.map((group) => (
            <div key={group.group_id}>
              <ListItemButton
                selected={selectedCategory?.group_id === group.group_id}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  backgroundColor:
                    selectedCategory?.group_id === group.group_id
                      ? "primary.light"
                      : "inherit",
                  color:
                    selectedCategory?.group_id === group.group_id
                      ? "primary.main"
                      : "black",
                  "&:hover": {
                    backgroundColor: "primary.light",
                    color: "white",
                  },
                }}
                onClick={() => handleGroupClick(group)}
              >
                <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
                  {group.icon && (
                    <Box
                      sx={{
                        display: "inline-flex",
                        alignItems: "center",
                        mr: 1,
                      }}
                    >
                      <img
                        src={`${urlBase}${group.icon}`}
                        alt="Icon"
                        style={{ width: 24, height: 24 }}
                      />
                    </Box>
                  )}
                  <ListItemText primary={group.name_id} />
                </Box>

                {group.departments.length > 0 && (
                  <ListItemIcon
                    onClick={(e) => handleToggleSubList(group.group_id, e)}
                    sx={{ minWidth: 0, cursor: "pointer" }}
                  >
                    {openGroup === group.group_id ? <ExpandLess /> : <ExpandMore />}
                  </ListItemIcon>
                )}
              </ListItemButton>

              <Collapse in={openGroup === group.group_id} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {group.departments.map((dept) => (
                    <ListItemButton
                      key={dept.departCode}
                      sx={{
                        pl: 4,
                        color:
                          selectedDepartment?.departCode === dept.departCode
                            ? "primary.main"
                            : "black",
                        "&:hover": { backgroundColor: "primary.light" },
                      }}
                      selected={selectedDepartment?.departCode === dept.departCode}
                      onClick={() => handleDepartmentClick(dept, group)}
                    >
                      <ListItemText secondary={`- ${dept.name}`} />
                    </ListItemButton>
                  ))}
                </List>
              </Collapse>
            </div>
          ))}
        </List>
      </Box>
    </Drawer>
  );
}
