import { useMediaQuery, Box, Button, Typography, useTheme } from "@mui/material";
import type { Group, Department } from "../../models/Flyer";


interface CategorySelectorProps {
    categories: Group[];
    selectedCategory: Group ;
    selectedDepartment: Department | null;
    onSelectCategory: (group: Group) => void;
    onSelectDepartment: (department: Department | null) => void;
}

const CategorySelector = ({ 
    selectedCategory, 
    selectedDepartment,
    onSelectCategory, 
    categories, 
    onSelectDepartment}:CategorySelectorProps) => {
        
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleCategory = (category: Group) =>{
    onSelectCategory(category)
    onSelectDepartment(null)
  }

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          margin: "1em 0px",
        }}
      >
        {!isSmallScreen &&
          categories.map((category, index) => (
            <Button
              key={index}
              variant={
                selectedCategory.name_id === category.name_id
                  ? "contained"
                  : "outlined"
              }
              onClick={() => handleCategory(category)}
              sx={{
                boxShadow: "0px 0px 3px 0.1px",
                margin: "0.5rem",
                backgroundColor:
                  selectedCategory.name_id === category.name_id
                    ? "#1976d2"
                    : "white",
                color:
                  selectedCategory.name_id === category.name_id
                    ? "#fff"
                    : "#1976d2",
                borderRadius: "50px",
                "&:hover": {
                  backgroundColor:
                    selectedCategory.name_id === category.name_id
                      ? "#1565c0"
                      : "#f5f5f5",
                },
              }}
            >
              {category.name_id}
            </Button>
          ))}
      </Box>
      <Typography
        sx={{
          textAlign: "start",
          marginBottom: "1rem",
          marginLeft: "1rem",
          fontSize: "90%",
          color: "grey",
        }}
        variant="h6"
        component="h6"
      >
        {selectedCategory.name_id} {selectedDepartment !== null && ` > ${selectedDepartment.name}`}
      </Typography>
    </div>
  );
};

export default CategorySelector;
