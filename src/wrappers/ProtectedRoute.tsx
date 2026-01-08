import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";

interface ProtectedRouteProps {
    children: React.ReactNode,
    permission: 
}

function ProtectedRoute({children}) {
  const { isAuthenticated, isLoading, user } = useAuth0()
  const navigate = useNavigate()
  useEffect(() => {
    if (isLoading) return
    if (!navigate) return
    if (!isAuthenticated) navigate('/')
    if (!user) return

  }, [isAuthenticated, isLoading, user])
}