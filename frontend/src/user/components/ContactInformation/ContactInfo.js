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
    return <ContactInfoEdit />;
  } else {
    return (
      <ContactInfoItem
        residentHouseNo={DUMMY_DATA.residentAddress.houseNo}
        residentStreet={DUMMY_DATA.residentAddress.street}
        residentLocationType={DUMMY_DATA.residentAddress.locationType}
        residentBarangay={DUMMY_DATA.residentAddress.barangay}
        residentProvince={DUMMY_DATA.residentAddress.province}
        residentZip={DUMMY_DATA.residentAddress.zip}
        permanentHouseNo={DUMMY_DATA.permanentAddress.houseNo}
        permanentStreet={DUMMY_DATA.permanentAddress.street}
        permanentLocationType={DUMMY_DATA.permanentAddress.locationType}
        permanentBarangay={DUMMY_DATA.permanentAddress.barangay}
        permanentProvince={DUMMY_DATA.permanentAddress.province}
        permanentZip={DUMMY_DATA.permanentAddress.zip}
        telephoneNum={DUMMY_DATA.telephoneNum}
        cellphoneNum={DUMMY_DATA.cellphoneNum}
        alternateEmail={DUMMY_DATA.alternateEmail}
      />
    );
  }
};

export default ContactInfo;
