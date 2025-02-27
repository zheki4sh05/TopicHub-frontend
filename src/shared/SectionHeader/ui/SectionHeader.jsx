import { Box } from "@mui/material";
import MenuWrapper from "../../../widgets/menu/ui/MenuWrapper";

function SectionHeader({children}) {
    return ( 
        <MenuWrapper>
<Box
  sx={{
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
  }}
>
  {children}
</Box>
</MenuWrapper>
     );
}

export default SectionHeader;