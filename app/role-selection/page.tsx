"use client";

import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, Users } from "lucide-react";
import { motion } from "framer-motion";

export default function RoleSelectionPage() {
  const router = useRouter();

  const roles = [
    {
      title: "Tournament Management",
      description: "Create and manage tournaments, track participants, and organize events",
      icon: Trophy,
      href: "/dashboard",
      gradient: "from-blue-500 to-purple-600"
    },
    {
      title: "Coaching Management",
      description: "Manage coaching sessions, track athletes, and monitor progress",
      icon: Users,
      href: "/coaching",
      gradient: "from-green-500 to-teal-600"
    }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-950 dark:to-neutral-900 p-4">
      <div className="max-w-4xl w-full space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-2">Welcome!</h1>
          <p className="text-neutral-600 dark:text-neutral-400">
            Choose your management area to continue
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {roles.map((role, index) => (
            <motion.div
              key={role.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card
                className="cursor-pointer h-full border-2 hover:border-primary transition-all duration-200 overflow-hidden"
                onClick={() => router.push(role.href)}
              >
                <CardHeader className="space-y-4">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${role.gradient} flex items-center justify-center`}>
                    <role.icon className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl mb-2">{role.title}</CardTitle>
                    <CardDescription className="text-base">
                      {role.description}
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-primary font-medium flex items-center">
                    Get Started
                    <svg
                      className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
