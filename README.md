# Helix Documentation Site

This documentation site integrates API and MCP documentation from the Helix Agent project.

## Features

- API documentation from Helix Agent TypeDoc
- MCP protocol documentation
- Developer guides and examples
- Ready for Vercel deployment

## Setup

1. Clone this repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Integration with Helix Agent

The documentation site automatically imports TypeDoc documentation from the Helix Agent project during the build process. To ensure this works correctly:

1. Make sure the Helix Agent project is located at `../helix_agent` relative to this directory
2. Run typedoc in the Helix Agent project:
   ```bash
   cd ../helix_agent
   npm run docs
   ```
3. Then build this documentation site:
   ```bash
   npm run build
   ```

## Vercel Deployment

This project is configured for deployment on Vercel. When deploying:

1. Connect your GitHub repository to Vercel
2. Set the build command to `npm run build`
3. Set the output directory to `dist`
4. Add the following environment variables if necessary:
   - `HELIX_AGENT_PATH`: If your Helix Agent repo is in a different location

## Adding More Documentation

- Create new `.md` or `.mdx` files in the `src/pages` directory
- Add custom components in `src/components`
- Modify styling in the main layout files

## License

[License Information]
