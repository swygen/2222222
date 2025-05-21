// Firebase config and initialization
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCl1854qJoh3hDbYTEwpILtdV3BC6xxYmE",
  authDomain: "bangla-quiz-hub-ffb2a.firebaseapp.com",
  projectId: "bangla-quiz-hub-ffb2a",
  storageBucket: "bangla-quiz-hub-ffb2a.appspot.com",
  messagingSenderId: "798921821758",
  appId: "1:798921821758:web:75df4b29b4e16341e5cb6f",
  measurementId: "G-WX2PHQQFKL"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// UI and React
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { FcGoogle } from "react-icons/fc";
import { FaCrown } from "react-icons/fa";

export default function PremiumAuthCard() {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleAuth = async () => {
    try {
      if (isSignup) {
        await createUserWithEmailAndPassword(auth, email, password);
        alert("Account created successfully");
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        alert("Login successful");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
      alert("Signed in with Google");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white">
      <Card className="w-full max-w-md p-6 rounded-2xl shadow-xl bg-[#111111]/90 backdrop-blur">
        <CardContent className="space-y-6">
          <div className="flex items-center justify-center text-3xl font-bold text-white">
            <FaCrown className="text-yellow-400 mr-2" />
            Premium Plus
          </div>

          <div className="space-y-3">
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-black/50 border border-gray-600 text-white"
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-black/50 border border-gray-600 text-white"
            />
            <Button
              onClick={handleAuth}
              className="w-full bg-yellow-500 text-black font-semibold hover:bg-yellow-600"
            >
              {isSignup ? "Sign Up" : "Login"}
            </Button>
            <Button
              onClick={handleGoogleLogin}
              className="w-full bg-white text-black font-semibold flex items-center justify-center space-x-2"
            >
              <FcGoogle size={20} />
              <span>Sign Up with Google</span>
            </Button>
            <p className="text-center text-sm mt-2">
              {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
              <button
                onClick={() => setIsSignup(!isSignup)}
                className="text-yellow-400 underline"
              >
                {isSignup ? "Login" : "Sign Up"}
              </button>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
