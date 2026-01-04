'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Star, Zap, Shield } from 'lucide-react';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';

const DEFAULT_PRICING = {
  title: 'Choose Your Plan',
  subtitle: 'Select the perfect plan for your needs. Upgrade or downgrade at any time.',
  plans: [
    {
      name: 'Basic',
      price: '$9',
      period: 'per month',
      description: 'Perfect for individuals getting started',
      isPopular: false,
      ctaText: 'Get Started',
      ctaHref: '/signup?plan=basic',
      features: [
        'Up to 5 projects',
        '10GB storage',
        'Email support',
        'Basic analytics',
        'Mobile app access',
      ],
    },
    {
      name: 'Pro',
      price: '$29',
      period: 'per month',
      description: 'Best for growing teams and businesses',
      isPopular: true,
      ctaText: 'Start Free Trial',
      ctaHref: '/signup?plan=pro',
      features: [
        'Unlimited projects',
        '100GB storage',
        'Priority support',
        'Advanced analytics',
        'Team collaboration',
        'API access',
        'Custom integrations',
      ],
    },
    {
      name: 'Enterprise',
      price: '$99',
      period: 'per month',
      description: 'Advanced features for large organizations',
      isPopular: false,
      ctaText: 'Contact Sales',
      ctaHref: '/contact?plan=enterprise',
      features: [
        'Everything in Pro',
        'Unlimited storage',
        '24/7 phone support',
        'Custom analytics',
        'SSO integration',
        'Advanced security',
        'Dedicated manager',
        'Custom contracts',
      ],
    },
  ],
} as const;

type PricingProps = Partial<typeof DEFAULT_PRICING>;

export default function Pricing(props: PricingProps) {
  const config = { ...DEFAULT_PRICING, ...props };
  const navigate = useSmartNavigation();

  const handlePlanSelect = (href: string) => {
    navigate(href);
  };

  const getPlanIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Star className="h-6 w-6" />;
      case 1:
        return <Zap className="h-6 w-6" />;
      case 2:
        return <Shield className="h-6 w-6" />;
      default:
        return <Star className="h-6 w-6" />;
    }
  };

  return (
    <section id="pricing" className="bg-background text-foreground py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span data-editable="title">{config.title}</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            <span data-editable="subtitle">{config.subtitle}</span>
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid gap-8 lg:gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
          {config.plans.map((plan, idx) => (
            <Card
              key={idx}
              className={`relative bg-card text-card-foreground transition-all duration-300 hover:shadow-lg ${
                plan.isPopular
                  ? 'border-primary shadow-lg scale-105 lg:scale-110'
                  : 'border-border hover:border-primary/50'
              }`}
            >
              {plan.isPopular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground px-4 py-1">
                    Most Popular
                  </Badge>
                </div>
              )}

              <CardHeader className="text-center pb-6">
                <div className="flex justify-center mb-4">
                  <div
                    className={`p-3 rounded-full ${
                      plan.isPopular
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {getPlanIcon(idx)}
                  </div>
                </div>

                <h3 className="text-2xl font-bold mb-2">
                  <span data-editable={`plans[${idx}].name`}>{plan.name}</span>
                </h3>

                <div className="mb-4">
                  <span className="text-4xl font-bold">
                    <span data-editable={`plans[${idx}].price`}>{plan.price}</span>
                  </span>
                  <span className="text-muted-foreground ml-2">
                    <span data-editable={`plans[${idx}].period`}>{plan.period}</span>
                  </span>
                </div>

                <p className="text-muted-foreground">
                  <span data-editable={`plans[${idx}].description`}>{plan.description}</span>
                </p>
              </CardHeader>

              <CardContent className="pt-0">
                <Button
                  className={`w-full mb-6 ${
                    plan.isPopular
                      ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                      : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                  }`}
                  onClick={() => handlePlanSelect(plan.ctaHref)}
                  data-editable-href={`plans[${idx}].ctaHref`}
                  data-href={plan.ctaHref}
                >
                  <span data-editable={`plans[${idx}].ctaText`}>{plan.ctaText}</span>
                </Button>

                <div className="space-y-3">
                  <h4 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground mb-4">
                    What's included:
                  </h4>
                  {plan.features.map((feature, featureIdx) => (
                    <div key={featureIdx} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm">
                        <span data-editable={`plans[${idx}].features[${featureIdx}]`}>
                          {feature}
                        </span>
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-muted-foreground">
            All plans include a 14-day free trial. No credit card required.
          </p>
        </div>
      </div>
    </section>
  );
}
