import { get } from 'svelte/store';
import { language } from '$lib/stores/language';

let translations: Record<string, any> = {};

export async function loadTranslations() {
  const lang = get(language);
  try {
    const response = await fetch(`/translations/${lang}.json`);
    translations = await response.json();
  } catch (error) {
    console.error('Error loading translations:', error);
  }
}

export function t(key: string): string {
  return translations[key] || key;
} 