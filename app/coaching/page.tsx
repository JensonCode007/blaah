"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Calendar, TrendingUp, Award, ArrowLeft, Plus } from "lucide-react";

export default function CoachingManagementPage() {
  const [sessions] = useState([
    {
      id: 1,
      name: "Advanced Techniques Workshop",
      date: "2024-12-15",
      time: "10:00 AM",
      athletes: 12,
      maxAthletes: 15,
      status: "upcoming"
    },
    {
      id: 2,
      name: "Beginner Training Session",
      date: "2024-12-10",
      time: "2:00 PM",
      athletes: 8,
      maxAthletes: 10,
      status: "ongoing"
    },
    {
      id: 3,
      name: "Performance Review",
      date: "2024-12-05",
      time: "4:00 PM",
      athletes: 6,
      maxAthletes: 6,
      status: "completed"
    }
  ]);

  const stats = [
    { label: "Total Athletes", value: "26", icon: Users, color: "text-blue-600" },
    { label: "Sessions This Month", value: "8", icon: Calendar, color: "text-green-600" },
    { label: "Avg. Performance", value: "85%", icon: TrendingUp, color: "text-purple-600" },
    { label: "Achievements", value: "14", icon: Award, color: "text-orange-600" }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      case 'ongoing': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'completed': return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
      default: return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Link href="/role-selection">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            </Link>
          </div>
          <h1 className="text-3xl font-bold">Coaching Management</h1>
          <p className="text-neutral-600 dark:text-neutral-400 mt-1">
            Manage your coaching sessions and track athlete progress
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Session
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    {stat.label}
                  </p>
                  <p className="text-2xl font-bold mt-1">{stat.value}</p>
                </div>
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Sessions List */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Coaching Sessions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sessions.map((session) => (
            <Card key={session.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <CardTitle className="text-lg">{session.name}</CardTitle>
                  <Badge className={getStatusColor(session.status)} variant="secondary">
                    {session.status}
                  </Badge>
                </div>
                <CardDescription>
                  <div className="space-y-1">
                    <div className="flex items-center text-sm">
                      <Calendar className="h-3 w-3 mr-2" />
                      {session.date} at {session.time}
                    </div>
                    <div className="flex items-center text-sm">
                      <Users className="h-3 w-3 mr-2" />
                      {session.athletes}/{session.maxAthletes} Athletes
                    </div>
                  </div>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full" size="sm">
                  View Details
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks and shortcuts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <Button variant="outline" className="justify-start">
              <Users className="h-4 w-4 mr-2" />
              Manage Athletes
            </Button>
            <Button variant="outline" className="justify-start">
              <Calendar className="h-4 w-4 mr-2" />
              Schedule Session
            </Button>
            <Button variant="outline" className="justify-start">
              <TrendingUp className="h-4 w-4 mr-2" />
              View Reports
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
