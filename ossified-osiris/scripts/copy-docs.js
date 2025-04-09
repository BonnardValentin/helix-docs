#!/usr/bin/env node

import { existsSync, mkdirSync, cpSync } from 'fs';
import { resolve, join } from 'path';
import { execSync } from 'child_process';

// Get paths
const rootDir = process.cwd();
const helixAgentPath = process.env.HELIX_AGENT_PATH || resolve(rootDir, '..', 'helix_agent');
const apiDocsOutput = join(rootDir, 'public', 'api-docs');
const mcpDocsOutput = join(rootDir, 'public', 'mcp-docs');

// Ensure output directories exist
if (!existsSync(apiDocsOutput)) {
  mkdirSync(apiDocsOutput, { recursive: true });
}

if (!existsSync(mcpDocsOutput)) {
  mkdirSync(mcpDocsOutput, { recursive: true });
}

// Copy TypeDoc documentation
try {
  const typeDocPath = join(helixAgentPath, 'docs', 'ts-docs');
  
  if (existsSync(typeDocPath)) {
    console.log(`Copying TypeDoc documentation from ${typeDocPath} to ${apiDocsOutput}`);
    cpSync(typeDocPath, apiDocsOutput, { recursive: true });
    console.log('API documentation copied successfully');
  } else {
    console.log('TypeDoc documentation not found. Generating...');
    execSync('npm run docs', { cwd: helixAgentPath, stdio: 'inherit' });
    
    if (existsSync(typeDocPath)) {
      cpSync(typeDocPath, apiDocsOutput, { recursive: true });
      console.log('API documentation generated and copied successfully');
    } else {
      console.error('Failed to generate TypeDoc documentation');
    }
  }
} catch (error) {
  console.error('Error copying API documentation:', error);
}

// Copy MCP documentation
try {
  const mcpDocsPath = join(helixAgentPath, 'docs', 'mcp');
  
  if (existsSync(mcpDocsPath)) {
    console.log(`Copying MCP documentation from ${mcpDocsPath} to ${mcpDocsOutput}`);
    cpSync(mcpDocsPath, mcpDocsOutput, { recursive: true });
    console.log('MCP documentation copied successfully');
  } else {
    console.log('MCP documentation not found. Please create it in the helix_agent repo');
    
    // Create a basic placeholder
    mkdirSync(mcpDocsOutput, { recursive: true });
    execSync(`echo "# MCP Documentation\n\nThis documentation will be generated from the helix_agent repo." > ${join(mcpDocsOutput, 'index.md')}`);
    console.log('Created MCP documentation placeholder');
  }
} catch (error) {
  console.error('Error copying MCP documentation:', error);
}

console.log('Documentation copying process complete'); 