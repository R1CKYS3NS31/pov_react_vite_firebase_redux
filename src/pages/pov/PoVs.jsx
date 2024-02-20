import { Grid } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPoVs } from "../../services/api/pov/api-pov";
import { setPovs } from "../../services/redux/slices/pov/povSlice";
import { PoV } from "../../components/pov/PoV";

export const PoVs = () => {
  const dispatch = useDispatch();
  const povs = useSelector((state) => state.povs);

  useEffect(() => {
    const povsFetch = async () => {
      const povsFetched = await fetchPoVs();
      if (povsFetched) {
        dispatch(setPovs(povsFetched));
      }
    };
    povsFetch();
  }, [dispatch]);

  return (
    <Grid
      container
      
      sx={{
        flex: 2,
      }}
      direction={"column"}
    >
      {povs &&
        povs.map((pov) => (
          <Grid item key={pov._id}>
            <PoV pov={pov} />
          </Grid>
        ))}
    </Grid>
  );
};
