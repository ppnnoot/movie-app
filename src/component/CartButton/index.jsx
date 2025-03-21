import React from "react";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Badge } from "@mui/material";
function CartButton({ cart, onClick }) {


  return (
    <>
      <Badge
        badgeContent={cart.length}
        color={"error"}
        overlap="circular"
        style={{
          height: "80px",
          width: "80px",
          position: "fixed",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          bottom: "30px",
          right: "40px",
          backgroundColor: "#FF9463",
          color: "white",
          borderRadius: "50%",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          cursor: "pointer",
          zIndex: 1000,
          transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
        }}
        onClick={onClick}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.2)";
          e.currentTarget.style.boxShadow =
            "0 6px 12px rgba(169, 169, 169, 0.5)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
        }}
      >
        <ShoppingCartOutlinedIcon style={{ fontSize: "40px" }} />
      </Badge>
    </>
  );
}

export default CartButton;
