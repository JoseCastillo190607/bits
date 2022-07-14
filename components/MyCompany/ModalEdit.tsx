import React from "react";
import { Button } from "@material-ui/core";
import { useMutation } from "@apollo/client";
import {
  GET_ALL_ENTERPRISE,
  DELETE_ENTERPRISE,
  UPDATE_ENTERPRISE,
} from "../../Querys/querys";

function ModalEdit({ id, name, rfc, cuentaBancaria }: any) {
  console.log(id);
  const [deleteEmpresa] = useMutation(DELETE_ENTERPRISE, {
    refetchQueries: [{ query: GET_ALL_ENTERPRISE }],
  });
  const [editEmpresa] = useMutation(UPDATE_ENTERPRISE, {
    refetchQueries: [{ query: GET_ALL_ENTERPRISE }],
  });
  const onDelete = () => {
    deleteEmpresa({
      variables: {
        deleteEnterpriseId: id,
      },
    });
    alert("La empresa ha sido eliminada");
  };

  const editEnterprise = () => {
    editEmpresa({
      variables: {
        updateEnterpriseId: id,
        input: {
          name: name,
          logo: "na",
          showlogo: "na",
          industry: "na",
          taxRegime: rfc,
          propertyRegime: "na",
          surcharge: "na",
          state: "na",
          address: "na",
          zipCode: "na",
          bankaccount: cuentaBancaria,
          IMSSSubdelegationKey: "na",
          fileCER: "na",
          extrahours: "na",
          automaticCalculationsVariables: "na",
          useSTPaspaymentmethod: "na",
          STPaccount: "na",
          stpCLABE: "na",
          IMSSminimumwage: "na",
          operationsIMSSSender: "na",
          CertificateOfUserIMSS: "na",
          CertificatePaswordIMSS: "na",
          IMSSCertificate: "na",
          FIELCertificate: "na",
          FIELPrivateKey: "na",
        },
      },
    });
  };

  return (
    <>
      <Button>Editar</Button>
      <Button onClick={onDelete}>Eliminar</Button>
    </>
  );
}

export default ModalEdit;
