'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Play, CheckCircle, Zap, Shield } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';

const DEFAULT_HERO = {
  badge: 'Streamlined Technology',
  title: 'Good Solutions for Seamless User Experiences',
  subtitle:
    'Validated technology that works flawlessly. Built for testing excellence with minimal complexity and maximum performance.',
  primaryCta: 'Start Testing',
  primaryCtaHref: '/get-started',
  secondaryCta: 'View Demo',
  secondaryCtaHref: '/demo',
  imageUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  imageAlt: 'Modern technology dashboard interface',
  features: [
    { title: 'Good Solutions for Seamless User Experiences', description: 'Every feature rigorously tested with real users' },
    { title: 'Good Solutions for Seamless User Experiences', description: 'Streamlined for maximum efficiency and speed' },
  ],
  stats: [
    { value: '99.9%', label: 'Uptime' },
    { value: '< 100ms', label: 'Response Time' },
    { value: '10k+', label: 'Tests Passed' },
  ],
} as const;

type HeroProps = Partial<typeof DEFAULT_HERO>;

export default function Hero(props: HeroProps) {
  const config = { ...DEFAULT_HERO, ...props };
  const navigate = useSmartNavigation();
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePrimaryCta = () => {
    navigate(config.primaryCtaHref);
  };

  const handleSecondaryCta = () => {
    setIsPlaying(true);
    navigate(config.secondaryCtaHref);
  };

  return (
    <section id="hero" className="bg-background text-foreground py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <Badge
                variant="secondary"
                className="bg-primary/10 text-primary border-primary/20 px-4 py-2"
              >
                <Zap className="h-4 w-4 mr-2" />
                <span data-editable="badge">{config.badge}</span>
              </Badge>

              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
                  <span data-editable="title">{config.title}</span>
                </h1>

                <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
                  <span data-editable="subtitle">{config.subtitle}</span>
                </p>
              </div>
            </div>

            {/* Features */}
            <div className="space-y-4">
              {config.features.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="text-primary mt-1">
                    {idx === 0 && <CheckCircle className="h-5 w-5" />}
                    {idx === 1 && <Shield className="h-5 w-5" />}
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">
                      <span data-editable={`features[${idx}].title`}>{feature.title}</span>
                    </h3>
                    <p className="text-muted-foreground">
                      <span data-editable={`features[${idx}].description`}>
                        {feature.description}
                      </span>
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                onClick={handlePrimaryCta}
                data-editable-href="primaryCtaHref"
                data-href={config.primaryCtaHref}
                className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-lg"
              >
                <span data-editable="primaryCta">{config.primaryCta}</span>
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>

              <Button
                variant="outline"
                size="lg"
                onClick={handleSecondaryCta}
                data-editable-href="secondaryCtaHref"
                data-href={config.secondaryCtaHref}
                className="border-border hover:bg-accent hover:text-accent-foreground px-8 py-6 text-lg"
              >
                <Play className={`mr-2 h-5 w-5 ${isPlaying ? 'animate-pulse' : ''}`} />
                <span data-editable="secondaryCta">{config.secondaryCta}</span>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-border">
              {config.stats.map((stat, idx) => (
                <div key={idx} className="text-center sm:text-left">
                  <div className="text-2xl sm:text-3xl font-bold text-primary">
                    <span data-editable={`stats[${idx}].value`}>{stat.value}</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <span data-editable={`stats[${idx}].label`}>{stat.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden bg-muted">
              <Image
                src={config.imageUrl}
                alt={config.imageAlt}
                data-editable-src="imageUrl"
                width={800}
                height={600}
                className="w-full h-auto object-cover"
                priority
              />

              {/* Overlay gradient for better text contrast */}
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent" />

              {/* Floating badge */}
              <div className="absolute top-6 left-6">
                <Badge className="bg-background/90 text-foreground backdrop-blur-sm">
                  <CheckCircle className="h-4 w-4 mr-2 text-primary" />
                  Validated & Tested
                </Badge>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/10 rounded-full blur-xl" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-accent/20 rounded-full blur-xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
