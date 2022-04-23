import React from "react";

import ContactInfoEdit from "./ContactInfoEdit";
import ContactInfoItem from "./ContactInfoItem";

const DUMMY_DATA = {
  //REPLACE WITH DATABASE
  residentAddress: {
    houseNo: "TEST",
    street: "TEST",
    locationType: "1",
    barangay: "TEST",
    city: "TEST",
    province: "TEST",
    zip: "TEST",
  },
  permanentAddress: {
    houseNo: "TEST2",
    street: "TEST2",
    locationType: "2",
    barangay: "TEST2",
    city: "TEST2",
    province: "TEST2",
    zip: "TEST2",
  },
  telephoneNum: "TEST",
  cellphoneNum: "TEST",
  alternateEmail: "TEST",
};

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
        residentBarangay={props.userData.barangayR}
        residentProvince={props.userData.provinceR}
        residentZip={props.userData.zipR}
        permanentHouseNo={props.userData.houseNoP}
        permanentStreet={props.userData.streetP}
        permanentLocationType={props.userData.locationTypeP}
        permanentBarangay={props.userData.barangayP}
        permanentProvince={props.userData.provinceP}
        permanentZip={props.userData.zipP}
        telephoneNum={props.userData.telephoneNum}
        cellphoneNum={props.userData.cellphoneNum}
        alternateEmail={props.userData.alternateEmail}
      />
    );
  }
};

export default ContactInfo;
