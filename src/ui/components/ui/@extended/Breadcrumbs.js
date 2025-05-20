import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import MuiBreadcrumbs from "@mui/material/Breadcrumbs";
import { Grid2, Typography } from "@mui/material";
import { MainCard } from "../cards/MainCard";
import { ArrowForwardIosOutlined } from "@mui/icons-material";

export const Breadcrumbs = ({ navigation, title, ...others }) => {
  const location = useLocation();
  const [main, setMain] = useState();
  const [item, setItem] = useState();

  // set active item state
  const getCollapse = (menu) => {
    if (menu.children) {
      menu.children.filter((collapse) => {
        if (collapse.type && collapse.type === "collapse") {
          getCollapse(collapse);
        } else if (collapse.type && collapse.type === "item") {
          if (location.pathname === collapse.url) {
            setMain(menu);
            setItem(collapse);
          }
        }
        return false;
      });
    }
  };

  useEffect(() => {
    navigation?.items?.map((menu) => {
      if (menu.type && menu.type === "group") {
        getCollapse(menu);
      }
      return false;
    });
  });

  // only used for component demo breadcrumbs
  if (location.pathname === "/breadcrumbs") {
    location.pathname = "/dashboard/analytics";
  }

  let mainContent;
  let itemContent;
  let breadcrumbContent = <Typography />;
  let itemTitle = "";

  // collapse item
  if (main && main.type === "collapse") {
    mainContent = (
      <Typography
        component={Link}
        underline={"hover"}
        to={document.location.pathname}
        variant="h6"
        sx={{ textDecoration: "none" }}
        color="textSecondary"
      >
        {main.title}
      </Typography>
    );
  }

  // items
  if (item && item.type === "item") {
    itemTitle = item.title;
    itemContent = (
      <Typography variant="subtitle1" color="textPrimary">
        {itemTitle}
      </Typography>
    );

    // main
    if (item.breadcrumbs !== false) {
      breadcrumbContent = (
        <MainCard
          border={false}
          sx={{ p: 2, mb: -2 }}
          {...others}
          content={false}
        >
          <Grid2
            container
            direction="column"
            justifyContent="flex-start"
            alignItems="flex-start"
            spacing={1}
          >
            <Grid2 item>
              <MuiBreadcrumbs
                separator={<ArrowForwardIosOutlined fontSize="inherit" />}
                maxItems={3}
                aria-label="breadcrumb"
              >
                <Typography
                  component={Link}
                  to="/"
                  color="textSecondary"
                  variant="h6"
                  sx={{ textDecoration: "none" }}
                >
                  Soko
                </Typography>
                {mainContent}
                {itemContent}
              </MuiBreadcrumbs>
            </Grid2>
            {title && (
              <Grid2 item sx={{ mt: 2, mb:1,  }}> 
                <Typography variant="h4">{item.title}</Typography>
              </Grid2>
            )}
          </Grid2>
        </MainCard>
      );
    }
  }

  return breadcrumbContent;
};

Breadcrumbs.propTypes = {
  navigation: PropTypes.object,
  title: PropTypes.bool,
};
 