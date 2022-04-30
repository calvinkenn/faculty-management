import React from "react";

import ContactInfoEdit from "./ContactInfoEdit";
import ContactInfoItem from "./ContactInfoItem";

const ContactInfo = (props) => {
  if (props.isEditMode) {
    return (
      <ContactInfoEdit
        userEdit={props.userData}
        setEditMode={props.setEditMode}
      />
    );
  } else {
    return (
      <ContactInfoItem
        residentHouseNo={props.userData.houseNoR}
        residentStreet={props.userData.streetR}
        residentLocationType={props.userData.locationTypeR}
        residentRegion={props.userData.regionR}
        residentProvince={props.userData.provinceR}
        residentCity={props.userData.cityR}
        residentBarangay={props.userData.barangayR}
        residentZip={props.userData.zipR}
        permanentHouseNo={props.userData.houseNoP}
        permanentStreet={props.userData.streetP}
        permanentLocationType={props.userData.locationTypeP}
        permanentRegion={props.userData.regionP}
        permanentProvince={props.userData.provinceP}
        permanentCity={props.userData.cityP}
        permanentBarangay={props.userData.barangayP}
        permanentZip={props.userData.zipP}
        telephoneNum={props.userData.telephoneNum}
        cellphoneNum={props.userData.cellphoneNum}
        alternateEmail={props.userData.alternateEmail}
      />
    );
  }
};

export default ContactInfo;
