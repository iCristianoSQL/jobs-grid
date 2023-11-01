import { Drawer } from "@mui/material";
import { TDrawer } from "../types";

export const JobDrawer = ({ drawerOpen, handleCloseDrawer }: TDrawer) => {
  return (
    <Drawer
      anchor="right"
      open={drawerOpen}
      onClose={handleCloseDrawer}
    >
        <h1>Olá mundo</h1>
    </Drawer>
  );
};
