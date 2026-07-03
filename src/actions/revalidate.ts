'use server';

import { updateTag } from 'next/cache';

export async function revalidatePlatformConfig() {
  updateTag('platform-config');
}
