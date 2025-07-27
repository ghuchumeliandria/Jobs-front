"use client";

import React from "react";
import { motion } from "framer-motion";

const LoadingOverlay = () => {
    return (
        <div className="fixed inset-0 z-[9999] bg-white bg-opacity-80 flex items-center justify-center backdrop-blur-sm">
            <motion.div
                className="w-20 h-20 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 150, damping: 20 }}
            />
        </div>
    );
};

export default LoadingOverlay;
