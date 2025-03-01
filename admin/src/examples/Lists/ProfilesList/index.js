/**
=========================================================
* Soft UI Dashboard PRO React - v4.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-pro-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// react-routers components
import { Link } from "react-router-dom";

// prop-types is library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";

// Soft UI Dashboard PRO React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftAvatar from "components/SoftAvatar";
import SoftButton from "components/SoftButton";

function ProfilesList({ title, profiles,contact }) {

  const renderProfiles = contact?.map(({ image, name, phones,emails }) => (
    <SoftBox key={name} component="li" display="flex" alignItems="center" py={1} mb={1}>
      <SoftBox mr={2} ml={2} >
        <SoftAvatar src={image ? image:'/assets/img/placeholder.png'} alt="something here" variant="rounded" shadow="md" />
      </SoftBox>
      <SoftBox
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
        justifyContent="center"
      >
        <SoftTypography variant="button" fontWeight="medium">
          {name}
        </SoftTypography>
        {
          emails?.map((email,index)=>{
            return  <SoftTypography key={index} variant="caption" color="text">
            Mail: {email}
          </SoftTypography>
          })
        }
       
       
          {
            phones?.map((phone,index)=>{
              return (
                <SoftTypography key={index} variant="caption" color="text">
                  Tel: {phone}
                </SoftTypography>
              )
            })
          }
          
        
      </SoftBox>
      
    </SoftBox>
  ));

  return (
    <Card  sx={{ height: "100%" }}>
      <SoftBox pt={2} px={2}>
        <SoftTypography variant="h6" fontWeight="medium" textTransform="capitalize">
          {title}
        </SoftTypography>
      </SoftBox>
      <SoftBox overflow="auto" height="22rem" p={2}>
        <SoftBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
          {renderProfiles}
        </SoftBox>
      </SoftBox>
    </Card>
  );
}

// Typechecking props for the ProfilesList
ProfilesList.propTypes = {
  title: PropTypes.string.isRequired,
  profiles: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ProfilesList;
