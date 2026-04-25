import { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../services/redux/slices/theme/themeSlice";
import { themeSelector } from "../services/redux/selectors/themeSelector";
import { theme } from "../styles/themes/index";

export const useUiSettings = () => {
  const dispatch = useDispatch();
  
  const themeType = useSelector(themeSelector);

   const activeTheme = useMemo(() => {
      return theme({ themeType });
    }, [themeType]);

  return {
    themeType,
    activeTheme,
    toggleTheme: useCallback(() => dispatch(toggleTheme()), [dispatch]),
  };
};
