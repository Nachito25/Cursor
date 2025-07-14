import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Check, Github, Star, GitPullRequest, Package, BarChart3, Zap, Shield, Users } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import SignInButton from "./SignInButton";
import NextAuthSessionProvider from "./SessionProvider";

export default function LandingPage() {
  return (
    <NextAuthSessionProvider>
      <div className="flex flex-col min-h-screen">
        {/* Header */}
        <header className="px-4 lg:px-6 h-14 flex items-center border-b">
          <Link className="flex items-center justify-center" href="/">
            <Github className="h-6 w-6 mr-2" />
            <span className="font-bold text-lg">Nacho Github Analyzer</span>
          </Link>
          <nav className="ml-auto flex gap-4 sm:gap-6">
            <Link className="text-sm font-medium hover:underline underline-offset-4" href="#features">
              Features
            </Link>
            <Link className="text-sm font-medium hover:underline underline-offset-4" href="#pricing">
              Pricing
            </Link>
            <Link className="text-sm font-medium hover:underline underline-offset-4" href="#about">
              About
            </Link>
          </nav>
          <div className="ml-4 flex gap-2">
            {/* Reemplaza los botones por el botón de login real */}
            <Link href="/dashboards">
              <Button variant="secondary" size="sm" className="">Dashboards</Button>
            </Link>
            <SignInButton />
          </div>
        </header>

        <main className="flex-1">
          {/* Hero Section */}
          <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
            <div className="container px-4 md:px-6">
              <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
                <div className="flex flex-col justify-center space-y-4">
                  <div className="space-y-2">
                    <Badge>🌮 Open Source Intelligence</Badge>
                    <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                      Unlock Deep Insights from Any GitHub Repository
                    </h1>
                    <p className="max-w-[600px] text-muted-foreground md:text-xl">
                      Get comprehensive analytics, summaries, and actionable insights from open source repositories. Track
                      stars, analyze pull requests, monitor versions, and discover cool facts about any GitHub project.
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 min-[400px]:flex-row">
                    <Button size="lg" variant="default" className="h-12 px-8">
                      Start Analyzing Free
                    </Button>
                    <Button variant="outline" size="lg" className="h-12 px-8 bg-transparent">
                      View Demo
                    </Button>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Check className="h-4 w-4 text-green-500" />
                      Free tier available
                    </div>
                    <div className="flex items-center gap-1">
                      <Check className="h-4 w-4 text-green-500" />
                      No credit card required
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <div className="relative">
                    <Image
                      src="/placeholder.svg?height=400&width=600"
                      width={600}
                      height={400}
                      alt="Nacho Github Analyzer Dashboard"
                      className="mx-auto aspect-video overflow-hidden rounded-xl object-cover shadow-2xl"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent rounded-xl" />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <Badge>Features</Badge>
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                    Everything You Need to Analyze GitHub Repositories
                  </h2>
                  <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    From basic metrics to deep insights, Nacho Github Analyzer provides comprehensive repository
                    intelligence to help you make informed decisions about open source projects.
                  </p>
                </div>
              </div>
              <div className="mx-auto grid max-w-5xl items-start gap-6 py-12 lg:grid-cols-3 lg:gap-12">
                <Card className="">
                  <CardHeader className="">
                    <BarChart3 className="h-8 w-8 mb-2 text-primary" />
                    <CardTitle className="">Repository Summary</CardTitle>
                    <CardDescription className="">
                      Get comprehensive overviews of any repository including key metrics, activity levels, and project
                      health indicators.
                    </CardDescription>
                  </CardHeader>
                </Card>
                <Card className="">
                  <CardHeader className="">
                    <Star className="h-8 w-8 mb-2 text-primary" />
                    <CardTitle className="">Star Analytics</CardTitle>
                    <CardDescription className="">
                      Track star growth over time, analyze star velocity, and understand what drives repository
                      popularity.
                    </CardDescription>
                  </CardHeader>
                </Card>
                <Card className="">
                  <CardHeader className="">
                    <Zap className="h-8 w-8 mb-2 text-primary" />
                    <CardTitle className="">Cool Facts Discovery</CardTitle>
                    <CardDescription className="">
                      Uncover interesting patterns, unusual commits, contributor insights, and hidden gems within
                      repositories.
                    </CardDescription>
                  </CardHeader>
                </Card>
                <Card className="">
                  <CardHeader className="">
                    <GitPullRequest className="h-8 w-8 mb-2 text-primary" />
                    <CardTitle className="">Pull Request Intelligence</CardTitle>
                    <CardDescription className="">
                      Monitor important PRs, track merge patterns, and identify critical changes that impact the project.
                    </CardDescription>
                  </CardHeader>
                </Card>
                <Card className="">
                  <CardHeader className="">
                    <Package className="h-8 w-8 mb-2 text-primary" />
                    <CardTitle className="">Version Tracking</CardTitle>
                    <CardDescription className="">
                      Stay updated with latest releases, version history analysis, and breaking change notifications.
                    </CardDescription>
                  </CardHeader>
                </Card>
                <Card className="">
                  <CardHeader className="">
                    <Users className="h-8 w-8 mb-2 text-primary" />
                    <CardTitle className="">Contributor Insights</CardTitle>
                    <CardDescription className="">
                      Analyze contributor patterns, identify key maintainers, and understand project collaboration
                      dynamics.
                    </CardDescription>
                  </CardHeader>
                </Card>
              </div>
            </div>
          </section>

          {/* How It Works */}
          <section className="w-full py-12 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <Badge>How It Works</Badge>
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Simple. Fast. Insightful.</h2>
                  <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Get started with repository analysis in just a few clicks. No complex setup required.
                  </p>
                </div>
              </div>
              <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
                <div className="flex flex-col items-center space-y-4 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground text-2xl font-bold">
                    1
                  </div>
                  <h3 className="text-xl font-bold">Enter Repository URL</h3>
                  <p className="text-muted-foreground">
                    Simply paste any GitHub repository URL into our analyzer and let us do the rest.
                  </p>
                </div>
                <div className="flex flex-col items-center space-y-4 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground text-2xl font-bold">
                    2
                  </div>
                  <h3 className="text-xl font-bold">AI-Powered Analysis</h3>
                  <p className="text-muted-foreground">
                    Our advanced algorithms analyze the repository structure, history, and patterns to generate insights.
                  </p>
                </div>
                <div className="flex flex-col items-center space-y-4 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground text-2xl font-bold">
                    3
                  </div>
                  <h3 className="text-xl font-bold">Get Actionable Insights</h3>
                  <p className="text-muted-foreground">
                    Receive comprehensive reports with summaries, metrics, and recommendations in seconds.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Pricing Section */}
          <section id="pricing" className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <Badge>Pricing</Badge>
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Choose Your Plan</h2>
                  <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Start free and scale as you grow. No hidden fees, cancel anytime.
                  </p>
                </div>
              </div>
              <div className="mx-auto grid max-w-5xl items-start gap-6 py-12 lg:grid-cols-3 lg:gap-8">
                {/* Free Tier */}
                <Card className="relative">
                  <CardHeader className="">
                    <CardTitle className="">Free</CardTitle>
                    <CardDescription className="">Perfect for getting started</CardDescription>
                    <div className="text-4xl font-bold">
                      $0<span className="text-lg font-normal text-muted-foreground">/month</span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500" />
                        <span className="text-sm">5 repository analyses per month</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500" />
                        <span className="text-sm">Basic insights and summaries</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500" />
                        <span className="text-sm">Star tracking</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500" />
                        <span className="text-sm">Version updates</span>
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter className="">
                    <Button className="w-full bg-transparent" variant="outline" size="sm">
                      Get Started Free
                    </Button>
                  </CardFooter>
                </Card>

                {/* Pro Tier */}
                <Card className="relative border-primary">
                  <Badge>Most Popular</Badge>
                  <CardHeader className="">
                    <CardTitle className="text-2xl">Pro</CardTitle>
                    <CardDescription className="">For serious developers and teams</CardDescription>
                    <div className="text-4xl font-bold">
                      $19<span className="text-lg font-normal text-muted-foreground">/month</span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500" />
                        <span className="text-sm">100 repository analyses per month</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500" />
                        <span className="text-sm">Advanced insights and cool facts</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500" />
                        <span className="text-sm">Pull request intelligence</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500" />
                        <span className="text-sm">Contributor insights</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500" />
                        <span className="text-sm">API access</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500" />
                        <span className="text-sm">Priority support</span>
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter className="">
                    <Button className="w-full" variant="default" size="sm">Start Pro Trial</Button>
                  </CardFooter>
                </Card>

                {/* Enterprise Tier */}
                <Card className="relative">
                  <CardHeader className="">
                    <CardTitle className="text-2xl">Enterprise</CardTitle>
                    <CardDescription className="">For large teams and organizations</CardDescription>
                    <div className="text-4xl font-bold">
                      $99<span className="text-lg font-normal text-muted-foreground">/month</span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500" />
                        <span className="text-sm">Unlimited repository analyses</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500" />
                        <span className="text-sm">Custom integrations</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500" />
                        <span className="text-sm">Advanced API with higher limits</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500" />
                        <span className="text-sm">Team collaboration features</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500" />
                        <span className="text-sm">Dedicated support</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500" />
                        <span className="text-sm">SLA guarantee</span>
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter className="">
                    <Button className="w-full bg-transparent" variant="outline" size="sm">
                      Contact Sales
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="w-full py-12 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                    Ready to Unlock Repository Insights?
                  </h2>
                  <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Join thousands of developers who trust Nacho Github Analyzer for their open source intelligence needs.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button size="lg" variant="default" className="h-12 px-8">
                    Start Your Free Analysis
                  </Button>
                  <Button variant="outline" size="lg" className="h-12 px-8 bg-transparent">
                    Schedule a Demo
                  </Button>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Shield className="h-4 w-4" />
                    No credit card required
                  </div>
                  <div className="flex items-center gap-1">
                    <Zap className="h-4 w-4" />
                    Setup in 30 seconds
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
          <p className="text-xs text-muted-foreground">© 2024 Nacho Github Analyzer. All rights reserved.</p>
          <nav className="sm:ml-auto flex gap-4 sm:gap-6">
            <Link className="text-xs hover:underline underline-offset-4" href="#">
              Terms of Service
            </Link>
            <Link className="text-xs hover:underline underline-offset-4" href="#">
              Privacy Policy
            </Link>
            <Link className="text-xs hover:underline underline-offset-4" href="#">
              Contact
            </Link>
          </nav>
        </footer>
      </div>
    </NextAuthSessionProvider>
  );
}
