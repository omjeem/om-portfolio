# Modern Portfolio Website

A professional portfolio website built with Next.js 15, React Server Components, and Tailwind CSS.

## Features

- **Modern Tech Stack**: Built with Next.js 15, React Server Components, TypeScript, and Tailwind CSS
- **Responsive Design**: Fully responsive across all device sizes
- **Dynamic Content**: All content is loaded from JSON data files
- **Dark/Light Mode**: Automatic theme switching based on user preference with manual override
- **Performance Optimized**: Fast loading times and optimized assets
- **SEO Friendly**: Proper metadata and semantic HTML
- **Accessibility**: WCAG compliant design and implementation

## Sections

- **Hero**: Eye-catching introduction with call-to-action buttons
- **About**: Personal information and background
- **Projects**: Showcase of work with filterable categories
- **Skills**: Technical skills with visual representation of proficiency
- **Experience**: Work history with timeline view
- **Education**: Academic background and certifications
- **Contact**: Contact form with validation

## Getting Started

### Prerequisites

- Node.js 18.17.0 or later

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/portfolio-website.git
   cd portfolio-website
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Customization

1. Edit the JSON files in the `data/` directory to update your personal information:
   - `personal.json`: Your personal details
   - `education.json`: Your educational background
   - `experience.json`: Your work experience
   - `projects.json`: Your projects
   - `skills.json`: Your technical skills
   - `site-config.json`: Site configuration
   - `testimonials.json`: Testimonials from colleagues or clients

2. Replace placeholder images:
   - Add your profile picture to `public/images/`
   - Add project screenshots to `public/images/projects/`
   - Add logos to `public/images/` for companies, schools, etc.

3. Customize the styling:
   - Edit colors in `src/app/globals.css`
   - Modify the theme in `data/site-config.json`

## Deployment

This project can be easily deployed to Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fyourusername%2Fportfolio-website)

## Built With

- [Next.js](https://nextjs.org/) - The React framework for production
- [React](https://reactjs.org/) - JavaScript library for building user interfaces
- [TypeScript](https://www.typescriptlang.org/) - Typed JavaScript
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [Lucide Icons](https://lucide.dev/) - Beautiful & consistent icons

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Inspired by modern portfolio design trends
- Icons from [Lucide Icons](https://lucide.dev/)
