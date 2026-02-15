import * as React from 'react';

import { cn } from '../../lib/utils';

function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('rounded-lg border border-border bg-panel text-foreground shadow-sm', className)} {...props} />;
}

function CardHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('space-y-1 p-3 pb-1.5 lg:space-y-1.5 lg:p-4 lg:pb-2', className)} {...props} />;
}

function CardTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={cn('text-xs font-semibold leading-none tracking-tight lg:text-sm', className)} {...props} />;
}

function CardContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('p-3 pt-1.5 lg:p-4 lg:pt-2', className)} {...props} />;
}

export { Card, CardContent, CardHeader, CardTitle };
