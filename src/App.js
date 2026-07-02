import { Routes, Route } from "react-router-dom";
import ScrollToTop from "./ScrollToTop";
import LoginPage from "./pages/LoginPage";
import HealthChallenges from "./pages/Challenges/challengelanding/HealthChallenges";
import SleepChallenge from "./pages/Challenges/SleepChallenge/sleep";
import ToxinChallenge from "./pages/Challenges/toxinchallenge/toxinchallenge";

import WellnessAtlasCms from "./pages/WellnessAtlasCms/WellnessAtlasCms";

function App() {
  return (
    <>
      <ScrollToTop />

      <Routes>
        <Route path="/" element={<HealthChallenges />} />
        <Route path="/sleep-challenge" element={<SleepChallenge />} />
        <Route path="/toxin-challenge" element={<ToxinChallenge />} />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/cms" element={<WellnessAtlasCms />} />
      </Routes>
    </>
  );
}

export default App;