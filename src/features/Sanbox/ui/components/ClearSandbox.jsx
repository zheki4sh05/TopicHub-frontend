import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import { isHeaderPresent, isPresent } from "../../model/sandboxSlice";
import { useTranslation } from "react-i18next";

function ClearSandbox({handleClear}) {
    const isSandboxPresent = useSelector(isPresent)
         const headerPresent =  useSelector(isHeaderPresent)
         const {t} = useTranslation()
    return (

          <Button
                  size="small"
                  variant="outlined"
                  color="error"
                  onClick={handleClear}
                  disabled={!isSandboxPresent && !headerPresent}
                >
                    {t('btn_reset')}
                
                </Button>
      );
}

export default ClearSandbox;