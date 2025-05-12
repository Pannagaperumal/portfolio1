import React, { useState, useEffect } from 'react';
import Blogs from './Blogs';
import { Bike, Github, Linkedin, Mail, Server, PenTool as Tool, Code, Database, Container, Rocket, GitGraph, Users, Star, GitFork, ArrowRight, Calendar, Sparkles } from 'lucide-react';
import resume from './Pannaga_Resume.pdf';

interface GitHubRepo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  topics: string[];
}

function App() {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        // Fetch all repositories (max 100 per request)
        const response = await fetch('https://api.github.com/users/Pannagaperumal/repos?per_page=100');
        if (!response.ok) throw new Error('Failed to fetch repositories');
    
        const data = await response.json();
        // Sort repositories by star count in descending order
        const sortedRepos = data.sort((a: GitHubRepo, b: GitHubRepo) => b.stargazers_count - a.stargazers_count);
    
        // Get top 4-6 most-starred repositories
        const topRepos = sortedRepos.slice(0, 6);
    
        setRepos(topRepos);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch repositories');
      } finally {
        setLoading(false);
      }
    };
    

    fetchRepos();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      {/* Hero Section */}
      <header className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-teal-400"> Pannaga Perumal</span>
          </h1>
          <h1 className="text-4xl md:text-5xl font-bold mb-3">
            Full Stack Developer 
            <span className="text-teal-400"> </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8">
            Building the future of technology through innovative solutions.
            Experienced in Python Django, Docker, and DevOps.
          </p>
          <div className="flex gap-4">
            <a href="#contact" className="border border-gray-600 hover:border-teal-500 px-6 py-3 rounded-lg font-medium transition-colors">
              Get in Touch
            </a>
            <a
              href={resume}
              download="Pannaga_Resume.pdf"
              className="bg-teal-500 hover:bg-teal-600 px-6 py-3 rounded-lg font-medium transition-colors"
              >
              Download Resume
            </a>
          </div>
        </div>
      </header>

      {/* Current Venture Section
      <section className="py-16 bg-gray-800/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-gradient-to-r from-teal-500/10 to-gray-800/30 p-8 rounded-2xl border border-teal-500/20">
            <div className="flex items-center gap-4 mb-6">
              <Rocket className="w-8 h-8 text-teal-400" />
              <h2 className="text-3xl font-bold">Current Venture</h2>
            </div>
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-teal-400">Founder & Technical Lead</h3>
                <p className="text-gray-300 text-lg">
                  Leading the development of an advanced facial recognition photo sorting application, designed to revolutionize how photographers manage and organize their photo collections with unparalleled efficiency and accuracy. This solution aims to reduce photo sorting time by up to 80%, allowing photographers to focus more on their creative work and less on administrative tasks.
                </p>
              <div className="flex gap-6 mt-4">
                <div className="flex items-center gap-2">
                  <Code className="w-5 h-5 text-teal-400" />
                  <span>Technical Lead</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-teal-400" />
                  <span>Team Management</span>
                </div>
                <div className="flex items-center gap-2">
                  <Rocket className="w-5 h-5 text-teal-400" />
                  <span>Product Strategy</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* Skills Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Technical Expertise</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-gray-800/50 p-8 rounded-xl border border-gray-700 hover:border-teal-500/50 transition-colors">
              <Code className="w-12 h-12 text-teal-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Backend Development</h3>
              <p className="text-gray-400">Python, Django, REST APIs, PostgreSQL</p>
            </div>
            <div className="bg-gray-800/50 p-8 rounded-xl border border-gray-700 hover:border-teal-500/50 transition-colors">
              <Container className="w-12 h-12 text-teal-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">DevOps</h3>
              <p className="text-gray-400">Docker, CI/CD, Cloud Services, Linux</p>
            </div>
            <div className="bg-gray-800/50 p-8 rounded-xl border border-gray-700 hover:border-teal-500/50 transition-colors">
              <Database className="w-12 h-12 text-teal-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Database Management</h3>
              <p className="text-gray-400">Database Design, Optimization, Migration</p>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="bg-gray-800/50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Featured Projects</h2>
          <div className="max-w-4xl mx-auto">
            {loading ? (
              <div className="text-center text-gray-400">Loading projects...</div>
            ) : error ? (
              <div className="text-center text-red-400">{error}</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {repos.map((repo) => (
                  <a 
                    key={repo.id}
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-800 rounded-xl overflow-hidden group hover:ring-2 hover:ring-teal-500/50 transition-all"
                  >
                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-2 group-hover:text-teal-400 transition-colors">
                        {repo.name}
                      </h3>
                      <p className="text-gray-400 mb-4 line-clamp-2">
                        {repo.description || 'No description available'}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {repo.topics.map((topic) => (
                          <span key={topic} className="px-3 py-1 bg-gray-700 rounded-full text-sm">
                            {topic}
                          </span>
                        ))}
                        {repo.language && (
                          <span className="px-3 py-1 bg-gray-700 rounded-full text-sm">
                            {repo.language}
                          </span>
                        )}
                      </div>
                      <div className="flex gap-4 text-gray-400">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4" />
                          <span>{repo.stargazers_count}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <GitFork className="w-4 h-4" />
                          <span>{repo.forks_count}</span>
                        </div>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Blogs Section */}
      <Blogs />

      {/* GitHub Contributions Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <GitGraph className="w-8 h-8 text-teal-400" />
              <h2 className="text-3xl font-bold">Open Source Contributions</h2>
            </div>
            <div className="bg-gray-800/50 p-8 rounded-xl border border-gray-700">
              <img
                src={`https://ghchart.rshah.org/0F4721/Pannagaperumal`}
                alt="GitHub Contributions"
                className="w-full rounded-lg"
              />
              <p className="text-gray-400 mt-4 text-center">
                Active contributor to open-source projects and the developer community
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="bg-gray-800/50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Work Experience</h2>
          <div className="max-w-3xl mx-auto bg-gray-800 rounded-xl p-8 border border-gray-700">
            <div className="mb-8">
              <h3 className="text-xl font-semibold">Software Developer</h3>
              <p className="text-teal-400 mb-2">Deep Cognition</p>
              <p className="text-gray-400 mb-4">1+ Year Experience</p>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                <li>Developed and maintained scalable web applications using Django</li>
                <li>Implemented DevOps practices and containerization using Docker</li>
                <li>Optimized database performance and implemented efficient APIs</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">About Me</h2>
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-12">
            <img 
              src="https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?auto=format&fit=crop&q=80&w=500"
              alt="Cycling adventure"
              className="w-full md:w-1/2 rounded-xl shadow-xl"
            />
            <div>
              <h3 className="text-2xl font-semibold mb-4">Passionate Developer & Biking Enthusiast</h3>
              <p className="text-gray-300 mb-6">
                When I'm not coding or working on my startup, you'll find me exploring new trails on my bike or brainstorming innovative product ideas. 
                I believe in building solutions that make a real difference, combining technical expertise with creative problem-solving.
              </p>
              <div className="flex gap-4">
                <Bike className="w-6 h-6 text-teal-400" />
                <Tool className="w-6 h-6 text-teal-400" />
                <Server className="w-6 h-6 text-teal-400" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Speaking Section */}
      <section className="py-16 bg-gray-800/50">
        <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Speaking Engagements & Conferences</h2>
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Event 1 */}
              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <h3 className="text-xl font-semibold mb-2 text-teal-400">Manthan 2k24</h3>
                <p className="text-gray-300 mb-4">Presented a technical talk on my research paper "Intelligent spider robot to diagonise faults in mega machines"</p>
              </div>
              {/* Event 2 */}
              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <h3 className="text-xl font-semibold mb-2 text-teal-400">Google Cloud Programme</h3>
                <p className="text-gray-300 mb-4">I was the google cloud practioner of the college, succesffuly rendering many talks and organising the Google coud campaign</p>
              </div>
              {/* Add more events as needed */}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-teal-500/10 to-gray-800/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Ready to Build Something Amazing?</h2>
                <p className="text-gray-300 text-lg mb-8">
                  I'm currently available for:
                </p>
                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3">
                    <Sparkles className="w-5 h-5 text-teal-400" />
                    <span>Full-stack Development Projects</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Container className="w-5 h-5 text-teal-400" />
                    <span>DevOps Consulting</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-teal-400" />
                    <span>Technical Advisory Roles</span>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a 
                    href="#contact" 
                    className="bg-teal-500 hover:bg-teal-600 px-8 py-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 group"
                  >
                    Schedule a Call
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </a>
                  <a 
                    href="mailto:pannagaperumal404@gmail.com@example.com" 
                    className="border border-teal-500/30 hover:border-teal-500 px-8 py-4 rounded-lg font-medium transition-colors text-center"
                  >
                    Send an Email
                  </a>
                </div>
              </div>
              <div className="bg-gray-800/50 p-8 rounded-xl border border-gray-700">
                <h3 className="text-xl font-semibold mb-6">Why Work With Me?</h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="text-teal-400 font-medium mb-2">Technical Excellence</h4>
                    <p className="text-gray-300">Full-stack expertise with a focus on scalable solutions using Python, Django, and modern DevOps practices.</p>
                  </div>
                  <div>
                    <h4 className="text-teal-400 font-medium mb-2">Startup Experience</h4>
                    <p className="text-gray-300">Deep understanding of startup needs and agile development from both technical and business perspectives.</p>
                  </div>
                  <div>
                    <h4 className="text-teal-400 font-medium mb-2">Result-Driven Approach</h4>
                    <p className="text-gray-300">Committed to delivering high-quality solutions that drive business growth and user satisfaction.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="bg-gray-800/50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Let's Connect</h2>
          <div className="max-w-xl mx-auto">
            <div className="flex justify-center gap-8 mb-8">
              <a href="https://github.com/pannagaperumal" className="text-gray-400 hover:text-teal-400 transition-colors">
                <Github className="w-8 h-8" />
              </a>
              <a href="https://in.linkedin.com/in/pannagaperumal" className="text-gray-400 hover:text-teal-400 transition-colors">
                <Linkedin className="w-8 h-8" />
              </a>
              <a href="mailto:pannagaperumal404@gmail.com" className="text-gray-400 hover:text-teal-400 transition-colors">
                <Mail className="w-8 h-8" />
              </a>
            </div>
            <p className="text-center text-gray-400">
              Currently available for freelance projects and exciting opportunities. <br />
              Let's work together to bring your ideas to life!
            </p>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 py-8">
        <div className="container mx-auto px-4 text-center text-gray-400">
          <p>© PannagaPerumal</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
