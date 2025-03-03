import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  experimental:{
    //允许为特定的路由采用PRR（Partial PreRendering）
    ppr: 'incremental'
  }
};

export default nextConfig;
