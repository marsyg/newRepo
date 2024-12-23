import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const RandomCircles = () => {
  const [circles, setCircles] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newCircle = {
        id: Date.now(),
        size: Math.random() * 100 + 20, // Circle size between 20px and 120px
        color: `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.7)`,
        initialX: Math.random() * window.innerWidth,
        initialY: Math.random() * window.innerHeight,
        endX: Math.random() * window.innerWidth,
        endY: Math.random() * window.innerHeight,
      };

      setCircles((prevCircles) => [...prevCircles, newCircle]);

      // Remove circle after 5 seconds
      setTimeout(() => {
        setCircles((prevCircles) =>
          prevCircles.filter((circle) => circle.id !== newCircle.id)
        );
      }, 5000);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-1/3 h-screen overflow-hidden bg-black">
      {circles.map((circle) => (
        <motion.div
          key={circle.id}
          initial={{ x: circle.initialX, y: circle.initialY }}
          animate={{ x: circle.endX, y: circle.endY }}
          transition={{ duration: 5, ease: "easeInOut" }}
          className="absolute rounded-full"
          style={{
            width: `${circle.size}px`,
            height: `${circle.size}px`,
            backgroundColor: circle.color,
          }}
        ></motion.div>
      ))}
    </div>
  );
};

export default RandomCircles;
