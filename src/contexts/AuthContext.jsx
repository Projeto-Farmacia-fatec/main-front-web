import React, { createContext, useContext, useState, useCallback } from "react";

// Dados mockados para testes
const MOCK_USERS = {
  PACIENTE: {
    name: "João Silva",
    cpf: "123.456.789-00",
    role: "PACIENTE",
    password: "123456",
  },
  SECRETARIA: {
    name: "Maria Santos",
    cpf: "234.567.890-11",
    role: "SECRETARIA",
    password: "123456",
  },
  FARMACIA: {
    name: "Carlos Oliveira",
    cpf: "345.678.901-22",
    role: "FARMACIA",
    password: "123456",
  },
  UBS: {
    name: "Ana Costa",
    cpf: "456.789.012-33",
    role: "UBS",
    password: "123456",
  },
};

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const login = useCallback(async (cpf, password, role) => {
    setLoading(true);

    // Simulando chamada à API
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const mockUser = MOCK_USERS[role];

        if (
          mockUser &&
          cpf === mockUser.cpf &&
          password === mockUser.password
        ) {
          const userData = {
            name: mockUser.name,
            cpf: mockUser.cpf,
            role: mockUser.role,
          };

          setUser(userData);
          localStorage.setItem("user", JSON.stringify(userData));
          setLoading(false);
          resolve(userData);
        } else {
          setLoading(false);
          reject(new Error("CPF ou senha inválidos"));
        }
      }, 800);
    });
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("user");
  }, []);

  // Verificar se já existe um usuário logado ao iniciar
  React.useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        localStorage.removeItem("user");
      }
    }
  }, []);

  const value = {
    user,
    login,
    logout,
    loading,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
