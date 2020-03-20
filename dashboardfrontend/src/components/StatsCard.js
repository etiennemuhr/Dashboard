import React from "react";

import { Paper, Typography, Icon, CssBaseline } from "@material-ui/core";

const StatsCard = ({
  title,
  subtitle,
  footerText,
  mainIcon,
  secondIcon,
  rgbaWith0_4Opacity,
  color1,
  color2
}) => {
  return (
    <div>
      <CssBaseline>
        <Paper className="stats__Home">
          <div className="containerText__Home">
            <Typography component="p" className="firstLine__Home">
              {title}
            </Typography>
            <Typography component="p" variant="h5">
              {subtitle}
            </Typography>
          </div>
          <div className="cardFooter__Home">
            <Typography variant="body2">
              <Icon className="iconLeftBottom__Home" style={{ fontSize: 20 }}>
                {secondIcon}
              </Icon>
              {footerText}
            </Typography>
          </div>
          <div
            className="iconContainer_Home"
            style={{
              background: `linear-gradient(60deg, ${color1}, ${color2})`,
              boxShadow: `0 4px 20px 0 rgba(0, 0, 0, 0.14),0 7px 10px -5px ${rgbaWith0_4Opacity}`
            }}
          >
            <Icon className="iconLeftBig_Home">{mainIcon}</Icon>
          </div>
        </Paper>
      </CssBaseline>
    </div>
  );
};

export default StatsCard;
