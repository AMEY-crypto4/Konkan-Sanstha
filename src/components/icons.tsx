import {
  Backpack, Baby, BookOpen, Bike, Droplets, Eye, Flower2, Gift, GraduationCap, HeartHandshake,
  House, LifeBuoy, Palette, Scale, Siren, Snowflake, Sparkles, Sprout, Stethoscope, Users, Utensils,
  type LucideIcon,
} from 'lucide-react';
import type { IconName } from '../content/types';

const MAP: Record<IconName, LucideIcon> = {
  'book-open': BookOpen,
  backpack: Backpack,
  'graduation-cap': GraduationCap,
  bike: Bike,
  home: House,
  sparkles: Sparkles,
  'heart-handshake': HeartHandshake,
  stethoscope: Stethoscope,
  eye: Eye,
  droplets: Droplets,
  sprout: Sprout,
  utensils: Utensils,
  'life-buoy': LifeBuoy,
  scale: Scale,
  snowflake: Snowflake,
  gift: Gift,
  palette: Palette,
  flower: Flower2,
  users: Users,
  siren: Siren,
  baby: Baby,
};

export function Icon({ name }: { name: IconName }) {
  const C = MAP[name] ?? Sparkles;
  return <C aria-hidden="true" focusable="false" />;
}
