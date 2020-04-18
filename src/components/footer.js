import React from "react";

// MUI
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";

// MUI Icons
import GitHubIcon from "@material-ui/icons/GitHub";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import InstagramIcon from "@material-ui/icons/Instagram";

export default function footer() {
  const mapSocialMedias = (
    <div>
      <a href="https://www.linkedin.com/in/khem-sok-5a42a2165/" target="_">
        <IconButton>
          <LinkedInIcon />
        </IconButton>
      </a>
      <a href="https://github.com/khemsok" target="_">
        <IconButton>
          <GitHubIcon />
        </IconButton>
      </a>
      <a href="https://www.instagram.com/_aceeeeeee_/" target="_">
        <IconButton>
          <InstagramIcon />
        </IconButton>
      </a>
    </div>
  );
  return (
    <div
      style={{
        textAlign: "center",
        padding: "30px",
      }}
    >
      <Typography variant="subtitle2">
        Developed by Khem Sok <span role="img">🎯</span>
      </Typography>
      {mapSocialMedias}
    </div>
  );
}
