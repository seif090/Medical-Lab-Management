import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
    <div class="space-y-6 animate-in fade-in duration-500 font-cairo">
      <div class="flex items-center justify-between">
        <h2 class="text-xl font-bold text-slate-900 border-r-4 border-amber-500 pr-3">المخزون والمحاليل (Inventory)</h2>
        <div class="flex gap-2">
          <button class="bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded text-[13px] font-bold shadow-sm hover:bg-slate-50 flex items-center gap-2">
            <lucide-icon name="plus" [size]="16"></lucide-icon>
            طلب توريد جديد
          </button>
          <button class="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded text-[13px] font-bold shadow-sm transition-all active:scale-95 flex items-center gap-2">
            <lucide-icon name="scan-barcode" [size]="16"></lucide-icon>
            مسح باركود
          </button>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div class="bg-rose-50 border border-rose-100 p-4 rounded-lg">
          <p class="text-[10px] font-black text-rose-500 uppercase tracking-wider mb-1">مواد قاربت على الانتهاء</p>
          <h3 class="text-2xl font-black text-rose-700">08</h3>
          <p class="text-[11px] text-rose-600 mt-1 font-bold">يجب الطلب فوراً</p>
        </div>
        <div class="bg-sky-50 border border-sky-100 p-4 rounded-lg">
          <p class="text-[10px] font-black text-sky-500 uppercase tracking-wider mb-1">إجمالي الأصناف</p>
          <h3 class="text-2xl font-black text-sky-700">142</h3>
          <p class="text-[11px] text-sky-600 mt-1 font-bold">في كافة المخازن</p>
        </div>
        <div class="bg-emerald-50 border border-emerald-100 p-4 rounded-lg">
          <p class="text-[10px] font-black text-emerald-500 uppercase tracking-wider mb-1">طلبيات منتظرة</p>
          <h3 class="text-2xl font-black text-emerald-700">03</h3>
          <p class="text-[11px] text-emerald-600 mt-1 font-bold">تصل خلال 48 ساعة</p>
        </div>
        <div class="bg-slate-900 p-4 rounded-lg text-white">
          <p class="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">قيمة المخزون</p>
          <h3 class="text-xl font-black text-sky-400">42,500 EGP</h3>
          <p class="text-[11px] text-slate-500 mt-1 font-bold italic">تقديري</p>
        </div>
      </div>

      <div class="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm">
        <div class="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div class="relative w-72">
            <input type="text" placeholder="بحث باسم المادة أو كود الشركة..." class="w-full bg-white border border-slate-200 rounded px-10 py-1.5 text-[13px] focus:ring-2 focus:ring-sky-500 outline-none font-medium">
            <lucide-icon name="search" [size]="14" class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"></lucide-icon>
          </div>
          <div class="flex gap-2">
             <select class="bg-white border border-slate-200 rounded px-3 py-1.5 text-[12px] font-bold text-slate-600">
               <option>جميع الأقسام</option>
               <option>الكيمياء</option>
               <option>الهيماتولوجي</option>
             </select>
          </div>
        </div>

        <table class="w-full text-right border-collapse text-[13px]">
          <thead class="bg-slate-100 text-slate-600 border-b border-slate-200 uppercase text-[11px] tracking-wider">
            <tr>
              <th class="px-4 py-3 font-bold">اسم الصنف (المحلول)</th>
              <th class="px-4 py-3 font-bold">الشركة المصنعة</th>
              <th class="px-4 py-3 font-bold">الكمية الحالية</th>
              <th class="px-4 py-3 font-bold">تاريخ الصلاحية</th>
              <th class="px-4 py-3 font-bold text-center">الحالة</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            <tr *ngFor="let item of inventory()" class="hover:bg-slate-50/50 transition-colors">
              <td class="px-4 py-3">
                <div class="flex flex-col">
                  <span class="font-bold text-slate-800">{{ item.name }}</span>
                  <span class="text-[10px] text-slate-400 font-mono">{{ item.sku }}</span>
                </div>
              </td>
              <td class="px-4 py-3 text-slate-600 font-medium">{{ item.manufacturer }}</td>
              <td class="px-4 py-3">
                <div class="flex items-center gap-2">
                   <span class="font-black text-slate-900">{{ item.quantity }}</span>
                   <span class="text-[10px] text-slate-500">{{ item.unit }}</span>
                </div>
              </td>
              <td class="px-4 py-3">
                <span 
                  class="font-bold"
                  [ngClass]="isExpiring(item.expiry) ? 'text-rose-600' : 'text-slate-500'"
                >
                  {{ item.expiry }}
                </span>
              </td>
              <td class="px-4 py-3 text-center">
                <span 
                  class="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider"
                  [ngClass]="{
                    'bg-emerald-100 text-emerald-700': item.status === 'In Stock',
                    'bg-rose-100 text-rose-700': item.status === 'Low Stock',
                    'bg-amber-100 text-amber-700': item.status === 'Expired'
                  }"
                >
                  {{ item.status === 'In Stock' ? 'متوفر' : item.status === 'Low Stock' ? 'مخزون منخفض' : 'منتهي الصلاحية' }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; }
  `]
})
export class InventoryComponent {
  inventory = signal([
    { name: 'Glucose (Hexokinase) Reagent', sku: 'RO-1029-GLU', manufacturer: 'Roche Diagnostics', quantity: 12, unit: 'Kits', expiry: '2024-12-15', status: 'In Stock' },
    { name: 'Lipid Control Level 1', sku: 'BIO-229-LIP', manufacturer: 'Bio-Rad', quantity: 2, unit: 'Vials', expiry: '2024-05-30', status: 'Low Stock' },
    { name: 'CBC Lyse Solution', sku: 'SYS-XN-LYS', manufacturer: 'Sysmex', quantity: 5, unit: 'Liters', expiry: '2025-02-20', status: 'In Stock' },
    { name: 'TSH Calibrator Set', sku: 'VID-TSH-CAL', manufacturer: 'bioMérieux', quantity: 1, unit: 'Set', expiry: '2024-04-10', status: 'Expired' },
    { name: 'Distilled Water (Grade 1)', sku: 'LAB-DW-01', manufacturer: 'Local Supply', quantity: 50, unit: 'Liters', expiry: '2026-01-01', status: 'In Stock' },
  ]);

  isExpiring(date: string): boolean {
    const expiry = new Date(date);
    const now = new Date();
    const diff = expiry.getTime() - now.getTime();
    return diff < (1000 * 60 * 60 * 24 * 30); // Less than 30 days
  }
}
