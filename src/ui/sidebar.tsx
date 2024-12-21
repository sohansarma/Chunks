import React, { ReactNode, useState, useEffect } from "react";
import {
  Button,
  Divider,
  Box,
  Drawer,
  Typography,
  Collapse,
  Slide,
} from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import { getColor } from "./color";

const useStyles = makeStyles((theme) =>
  createStyles({
    drawerStyle: {
      // zIndex: 1200, //not required in safari browser
      position: "relative",
      flexShrink: 0,
      "& .MuiDrawer-paper": {
        color: getColor("shades", 0),
        boxSizing: "border-box",
        background: getColor("background", 1400),
        transition: "width 200ms",
      },
    },
    drawerStyleOpen: {
      width: "279px",
      "& .MuiDrawer-paper": {
        width: "279px",
      },
      overflow: "scroll",
    },
    drawerStyleClose: {
      width: "64px",
      "& .MuiDrawer-paper": {
        width: "64px",
        overflowY: "unset",
      },
    },
    openContent: {
      width: "100%",
      // borderBottom: `1px solid ${getColor('border', 500)}`
    },
    overlappingSidebar: {
      position: "absolute",
      top: "0",
      left: "0",
      bottom: "0",
    },
    divider: {
      height: 0,
      backgroundColor: getColor("extra", 400),
      margin: "auto !important",
      marginBottom: "21px !important",
      marginTop: "-2px !important",
    },
    tricaLogoOpen: {
      pointerEvents: "none",
      height: "69px",
    },
    tricaLogoClose: {
      visibility: "hidden",
    },
    expandButton: {
      height: "100%",
    },
    tricaNavButton: {
      height: "16px",
      margin: "auto",
      transition: "transform 1s",
      transform: "rotate(0deg)",
    },
    tricaNavButtonClose: {
      transition: "transform 1s",
      transform: "rotate(180deg)",
    },
    headerSection: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      height: "69px",
      width: "96%",
    },
    allSidePadding: { padding: "12px 0 12px 16px" },
    verticalPadding: { padding: "12px 0" },
    drawerBody: {
      display: "flex",
      flexDirection: "column",
      height: "100%",
    },
    navIcon: {
      height: "15px",
      width: "15px",
      pointerEvents: "none",
    },
    collapsedItem: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      height: "45px",
      width: "45px",
      borderRadius: "8px",
      margin: "auto",
      marginBottom: "10px",
      cursor: "pointer",
      "&:hover": {
        backgroundColor: getColor("background", 1300),
      },
    },
    outerContainer: {
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
    },
  })
);

export type subOptionsType = {
  label: string;
  value: string;
  icon?: string;
  link?: string;
};

export type OptionsType = {
  label: string;
  value: string;
  icon?: string;
  link?: string;
  suboptions?: Array<subOptionsType>;
};

export type LogoSizeType = {
  width: string;
  height: string;
};

export type SidebarProps = {
  /**
   * a node to be rendered in the sidebar component.
   */
  children?: ReactNode;
  /**
   * pass true to keep the drawer open
   */
  open?: boolean;
  /**
   * callback function triggered on click of nav button
   */
  onToggle?: Function;
  /**
   * options to show with sub-options
   */
  options: Array<OptionsType>;

  /**
   * handler that will be triggered upon click of an option
   */
  onClickOnOption?: Function;

  /**
   * handler that will be triggered upon click of a sub-option
   */
  onClickOnSubOption?: Function;

  /**
   * custom styling for logo section in sidebar
   */
  logoSectionStyles?: object;

  /**
   * active option to show in sidebar
   */
  activeOption?: any;

  /**
   * Funtion to run on route change
   */
  handleChange?: Function;

  /**
   * ReactNode to show as banner
   */
  sideBarBanner?: ReactNode;

  /**
   * Funtion to open new ui modal
   */
  onClickSideBarBanner?: Function;

  customDrawerBodyStyles?: object;

  logoSize?: LogoSizeType;
};

const Sidebar = ({
  open = true,
  onToggle = () => {},
  options = [],
  activeOption = {},
  logoSectionStyles = {},
  onClickOnOption = () => {},
  onClickOnSubOption = () => {},
  customDrawerBodyStyles = {},
  logoSize = { width: "164px", height: "58px" },
  handleChange = () => {},
  onClickSideBarBanner = () => {},
  sideBarBanner,
}: SidebarProps) => {
  const classes = useStyles();
  const [openMenu, setOpenMenu] = useState(
    localStorage.getItem("navbarOpen") != "false"
  );
  const [menuHover, setMenuHover] = useState(false);
  const [openedOptions, setopenedOptions] = useState([
    activeOption.optionValue,
  ]);

  useEffect(() => {
    let localFlag =
      localStorage.getItem("navbarOpen") === "false"
        ? false
        : localStorage.getItem("navbarOpen") === "true"
        ? true
        : null;
    if (localFlag === null) {
      const screenWidth = window.screen.width;
      if (screenWidth < 1280) {
        localFlag = false;
      } else {
        localFlag = true;
      }
    }
    setOpenMenu(localFlag);
    onToggle(localFlag);
  }, []);

  useEffect(() => {
    if (activeOption.closeOthers) {
      setopenedOptions([activeOption.optionValue]);
      return;
    }
    if (!openedOptions.includes(activeOption.optionValue)) {
      const newOptions = openedOptions;
      newOptions.push(activeOption.optionValue);
      setopenedOptions([...newOptions]);
    }
  }, [activeOption]);

  const handleOptions = (value: string) => {
    if (openedOptions.includes(value)) {
      const newOptions = openedOptions;
      newOptions.splice(newOptions.indexOf(value), 1);
      setopenedOptions([...newOptions]);
    } else {
      const newOptions = openedOptions;
      newOptions.push(value);
      setopenedOptions([...newOptions]);
    }
  };

  const handleToggle = () => {
    onToggle(!openMenu);
    localStorage.setItem("navbarOpen", `${!openMenu}`);
    setOpenMenu(!openMenu);
  };

  const handleClickOption = (option: any) => {
    onClickOnOption && onClickOnOption(option);
  };

  const handleClickSubOption = (suboption: any, option: any) => {
    onClickOnSubOption && onClickOnSubOption(suboption, option);
    handleChange && handleChange(option, suboption);
  };

  const openFlag = openMenu || menuHover;

  return (
    <Drawer
      className={`${classes.drawerStyle} ${
        openFlag ? classes.drawerStyleOpen : classes.drawerStyleClose
      } ${openFlag ? classes.overlappingSidebar : ""}`}
      variant="persistent"
      anchor="left"
      open={open}
      id="navbar"
    >
      <Box className={classes.drawerBody}>
        <Box
          className={`${classes.headerSection} ${
            openFlag ? classes.allSidePadding : classes.verticalPadding
          }`}
          sx={{ ...logoSectionStyles, ...customDrawerBodyStyles }}
        >
          {openFlag ? (
            <Box
              marginTop="0px"
              alignSelf={"center"}
              data-testid="lv-glassboard-logo"
            >
              <img
                src={""}
                alt="lv-glassboard-logo"
                className={`${
                  openFlag ? classes.tricaLogoOpen : classes.tricaLogoClose
                }`}
                style={{ width: logoSize.width, height: logoSize.height }}
              />
            </Box>
          ) : null}
          <Box alignSelf={"center"} height="100%">
            <Button
              onClick={() => {
                handleToggle();
              }}
              data-testid="nav-button"
              className={classes.expandButton}
            >
              <img
                src="https://dsjvxb1plg419.cloudfront.net/v2.0/NavExpandIcon.svg"
                alt="navButton"
                className={`${classes.tricaNavButton} ${
                  openMenu ? "" : classes.tricaNavButtonClose
                }`}
              />
            </Button>
          </Box>
        </Box>
        <Divider
          sx={{ width: openFlag ? "192px" : "45px" }}
          className={classes.divider}
        />
        <div
          style={{
            height: "100%",
            borderTop: `1px solid ${
              openFlag ? getColor("border", 500) : "transparent"
            }`,
          }}
          onMouseOver={() => setMenuHover(true)}
          onMouseLeave={() => setMenuHover(false)}
        >
          <Slide
            in={openFlag}
            timeout={{ enter: 500, exit: 500 }}
            direction="right"
          >
            <div
              style={{ display: openFlag ? "block" : "none", height: "100%" }}
            >
              <div className={classes.outerContainer}>
                <div>
                  {options.map((option: any, index: any) => {
                    if (!option.label) {
                      return null;
                    }
                    return (
                      <div
                        key={index}
                        style={{
                          width: "100%",
                          // borderBottom: `1px solid ${getColor('border', 500)}`,
                          ...(option?.position === "bottom"
                            ? { bottom: 0, position: "absolute" }
                            : {}),
                        }}
                        className={classes.openContent}
                      >
                        <Box
                          id={option.id ?? ""}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            height: "45px",
                            flexWrap: "wrap",
                            justifyContent: "space-between",
                            padding: "0 15px",
                            backgroundColor: `${
                              option.value == activeOption.subOptionValue &&
                              !option.disabled
                                ? `${getColor("tertiary", 900)}`
                                : getColor("background", 1400)
                            }`,
                          }}
                          onClick={() => {
                            if (option.disabled) return null;
                            handleOptions(option.value);
                            !option.suboptions && handleChange(option, option);
                            handleClickOption(option);
                          }}
                          sx={{
                            cursor: "pointer",
                          }}
                        >
                          <div
                            style={{
                              margin: 0,
                              padding: 0,
                              display: "flex",
                              flexWrap: "wrap",
                              alignItems: "center",
                            }}
                          >
                            {option.icon && (
                              <i
                                className={`${classes.navIcon} ${option.icon}`}
                              />
                            )}

                            <Typography
                              sx={{
                                marginLeft: "10px",
                                fontWeight: 500,
                                lineHeight: "21px",
                                fontFamily: "Work Sans",
                                fontSize: "15px",
                                cursor: "pointer",
                                opacity: option.disabled ? "50%" : "100%",
                              }}
                            >
                              {option.label}
                            </Typography>
                            {option.rightIcon ? option.rightIcon : null}
                          </div>
                          {option.suboptions && !option.disabled ? (
                            openedOptions.includes(option.value) ? (
                              <i className="fa-sharp fa-solid fa-chevron-up"></i>
                            ) : (
                              <i className="fa-sharp fa-solid fa-chevron-down"></i>
                            )
                          ) : (
                            <></>
                          )}
                        </Box>
                        <Box>
                          <Collapse
                            in={
                              option.suboptions &&
                              openedOptions.includes(option.value)
                            }
                            timeout={500}
                          >
                            {option.suboptions?.map(
                              (suboption: any, index: any) => {
                                if (!suboption.label) {
                                  return null;
                                }
                                return (
                                  <Box
                                    id={suboption.id ?? ""}
                                    key={suboption.link}
                                    sx={{
                                      marginTop: "1px",
                                      marginBottom: "1px",
                                      cursor: suboption.disabled
                                        ? "not-allowed"
                                        : "pointer",
                                      backgroundColor: `${
                                        suboption.value ==
                                          activeOption.subOptionValue &&
                                        !suboption.disabled
                                          ? `${getColor(
                                              "tertiary",
                                              900
                                            )} !important`
                                          : "transparent"
                                      }`,
                                      "&:hover": {
                                        backgroundColor: suboption.disabled
                                          ? "transparent"
                                          : getColor("background", 1300),
                                      },
                                    }}
                                    onClick={() => {
                                      if (suboption.disabled) return null;
                                      handleClickSubOption(suboption, option);
                                    }}
                                  >
                                    <div
                                      style={{
                                        margin: 0,
                                        padding: 0,
                                        display: "flex",
                                        flexWrap: "wrap",
                                        alignItems: "center",
                                      }}
                                    >
                                      {suboption.leftIcon
                                        ? suboption.leftIcon
                                        : null}
                                      <Typography
                                        sx={{
                                          color: getColor("shades", 0),
                                          alignItems: "center",
                                          fontWeight: 600,
                                          lineHeight: "19.5px",
                                          fontFamily: "Work Sans",
                                          fontSize: "14px",
                                          height: "34px",
                                          marginLeft: "40px",
                                          display: "flex",
                                          opacity: suboption.disabled
                                            ? "50%"
                                            : "100%",
                                        }}
                                        key={index}
                                      >
                                        {suboption.label}
                                      </Typography>
                                      {suboption.rightIcon
                                        ? suboption.rightIcon
                                        : null}
                                    </div>
                                  </Box>
                                );
                              }
                            )}
                          </Collapse>
                        </Box>
                      </div>
                    );
                  })}
                </div>
                {!!sideBarBanner && (
                  <div
                    onClick={(e) => {
                      onClickSideBarBanner();
                    }}
                    style={{ display: !openFlag ? "none" : "" }}
                  >
                    {sideBarBanner}
                  </div>
                )}
              </div>
            </div>
          </Slide>
          <Slide
            in={!openFlag}
            timeout={{ enter: 500, exit: 500 }}
            direction="right"
          >
            <div style={{ display: openFlag ? "none" : "block" }}>
              {options.map((option: any, index) => {
                if (!option.label) {
                  return null;
                }
                return (
                  <Box
                    key={index}
                    className={classes.collapsedItem}
                    sx={{
                      backgroundColor:
                        activeOption.optionValue == option.value
                          ? `${getColor("tertiary", 900)} !important`
                          : "transparent",
                      ...(option?.position === "bottom"
                        ? { bottom: 0, position: "absolute" }
                        : {}),
                    }}
                    onClick={() => {
                      if (option.disabled) return null;
                      handleToggle();
                      handleOptions(option.value);
                      !option.suboptions && handleChange(option, "");
                    }}
                  >
                    {option.icon && (
                      <i
                        style={{ fontSize: "large" }}
                        className={`main ${classes.navIcon} ${option.icon}`}
                      />
                    )}
                  </Box>
                );
              })}
            </div>
          </Slide>
        </div>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
