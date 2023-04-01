<template>
  <div class="p-1" @click="showPopup">
    <div
      class="w-full h-full relative bg-color-2 rounded-2xl overflow-hidden"
      :class="props.dayData.content?.length && 'cursor-pointer'"
      v-if="props.dayData"
    >
      <div
        :class="isCurrentDay && `bg-red`"
        class="absolute top-1 right-1 w-5 h-5 bg-color-1 text-color-5 rounded-full flex justify-center items-center text-xs font-bold z-[1]"
      >
        {{ props.dayData?.dayInfo.dayIndex }}
      </div>

      <div
        class="h-full flex flex-col"
        v-if="dayData?.content && dayData.content.length > 0"
      >
        <div v-for="(serial, id) of serializeData" :key="id" class="h-full">
          <div
            class="w-full h-full bg-cover bg-repeat flex items-end p-1 relative mb-0.5 last:mb-0"
            :style="`background-image: url(${VITE_CDN_URL}/serials/${serial[0].serial._id}.jpg);`"
          >
            <div
              class="absolute inset-0 flex items-end p-0.5 bg-gradient-to-t from-color-1 to-transparent"
            >
              <div
                class="flex items-center overflow-hidden truncate text-color-5 text-xs rounded-md pl-1 pr-1"
              >
                <span class="truncate">{{ serial[0].serialTitle }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Popup v-model="isShowPopup">
      <CalendarCellPopup :dayData="serializeData" />
    </Popup>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";
import dateHelper from "@/modules/common/helpers/DateHelper";
import type { TDay } from "@/modules/calendar/types";
import Popup from "@/modules/common/components/Popup.vue";
import CalendarCellPopup from "@/modules/calendar/components/CalendarCellPopup.vue";
import type { ISerialEpisodeWithSerialInfo } from "@/modules/calendar/types";
import { useCalendarStore } from "@/modules/calendar/useCalendarStore";

export interface ITransformedSerials extends ISerialEpisodeWithSerialInfo {
  serialTitle: string;
}

const VITE_CDN_URL = import.meta.env.VITE_CDN_URL;

const props = defineProps<{
  dayData: TDay;
}>();

const isShowPopup = ref(false);

const { userDate, currentCalendarMonth } = useCalendarStore();

const isCurrentDay = computed(() => {
  return (
    props.dayData?.dayInfo.dayIndex === userDate.getDate() &&
    dateHelper.getMonthIndex(currentCalendarMonth) === userDate.getMonth()
  );
});

function showPopup() {
  if (props.dayData?.content && props.dayData?.content?.length > 0) {
    isShowPopup.value = true;
  }
}

const serializeData = computed(() => {
  const obj: { [title: string]: ITransformedSerials[] } = {};

  props.dayData?.content?.forEach((el) => {
    const serialTitle = el.serial.title;
    const serialId = el.serial._id;

    if (!obj[serialId]) {
      obj[serialId] = [];
    }

    obj[serialId].push({ ...el, serialTitle: serialTitle });
  });

  return obj;
});
</script>
