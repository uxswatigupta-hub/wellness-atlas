import { Routes, Route } from "react-router-dom";
import ScrollToTop from "./ScrollToTop";
import HealthChallenges from "./pages/Challenges/challengelanding/HealthChallenges";
import ToxinChallenge from "./pages/Challenges/toxinchallenge/toxinchallenge";
import SleepChallenge from "./pages/Challenges/SleepChallenge/sleep";

function App() {
  return (
    <>
      <ScrollToTop />

      <Routes>
        <Route path="/" element={<HealthChallenges />} />
        <Route path="/sleep-challenge" element={<SleepChallenge />} />
        <Route path="/toxin-challenge" element={<ToxinChallenge />} />
      </Routes>
    </>
  );
}

export default App;