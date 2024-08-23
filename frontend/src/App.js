import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavbarMenu from "./components/Navbar";
import Register from "./components/Register";
import Pools from "./components/Pools";
import { useState, useEffect, useCallback } from "react";
import { connect, getContractAndSigner } from "./pool_circle_contract";

function App() {

  const [contract, setContract] = useState(null);
  const [connected, setConnected] = useState(false);
  const [isMember, setIsMember] = useState(false);

  const handleMemberState = useCallback(async (signer, contract) => {
    const signerAddress = await signer.getAddress();
    console.log({ address: signerAddress });
    contract.members(signerAddress).then((resultIsMember) => {
      console.log({ resultIsMember });
      setIsMember(resultIsMember);
    });
  }, []);

  const handleInit = useCallback(async () => {
    setConnected(true);
    const { signer, contract } = await getContractAndSigner();
    setContract(contract);

    if (contract) {
      await handleMemberState(signer, contract);
    }
  }, [handleMemberState]);

  useEffect(() => {
    window.ethereum.request({ method: 'eth_accounts' })
      .then((accounts) => {
        if (accounts.length > 0) {
          handleInit();
        } else {
          setConnected(false)
        };
      })
  }, [handleInit]);

  const connectCallback = async () => {
    const { signer, contract } = await connect();
    setContract(contract);
    if (contract) {
      setConnected(true);
      await handleMemberState(signer, contract);
      ;
    } else {
      setConnected(false);
    }
  }

  const registerMember = async () => {
    if (!contract) {
      alert("connect to the contract first");
      return;
    }

    await contract.addNewMember().then(() => {
      console.log("member added");
      setIsMember(true);
    }).catch((err) => {
      console.log(err);
    });

  }

  return (
    <Router>
      <NavbarMenu
        connect={connectCallback}
        connected={connected}
        registerMember={registerMember}
        isMember={isMember}
      />
      <div className="container">
        <Routes>
          <Route path="register" element={<Register />} />
          <Route path="pools" element={<Pools />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;