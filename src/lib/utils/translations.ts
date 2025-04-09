import { get } from 'svelte/store';
import { language } from '$lib/stores/language';

interface TranslationKeys {
  welcome: string;
  about: string;
  contact: string;
  home: string;
  'hero.title': string;
  'hero.subtitle': string;
}

let translations: TranslationKeys = {
  welcome: '',
  about: '',
  contact: '',
  home: '',
  'hero.title': '',
  'hero.subtitle': ''
};

export async function loadTranslations() {
  const lang = get(language);
  try {
    const response = await fetch(`/translations/${lang}.json`);
    translations = await response.json();
  } catch (error) {
    console.error('Error loading translations:', error);
  }
}

export function t(key: keyof TranslationKeys): string {
  return translations[key] || key;
} 