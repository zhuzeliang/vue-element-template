<template>
  <el-form-item
    v-if="!widget.hidden"
    :label="widget.label"
    :prop="widget.key"
    :rules="widget.rules"
  >
    <template v-if="widget.type == 'input'">
      <el-input
        v-if="
          widget.dataType == 'number' || widget.dataType == 'integer' || widget.dataType == 'float'
        "
        v-model.number="dataModel"
        :type="widget.dataType"
        :placeholder="widget.placeholder"
        :style="{ width: widget.width }"
        :disabled="disabled || widget.disabled"
      />
      <el-input
        v-else
        v-model="dataModel"
        :type="widget.dataType"
        :disabled="disabled || widget.disabled"
        :placeholder="widget.placeholder"
        :style="{ width: widget.width }"
      />
    </template>

    <template v-if="widget.type == 'textarea'">
      <el-input
        v-model="dataModel"
        :rows="5"
        :disabled="disabled || widget.disabled"
        :placeholder="widget.placeholder"
        :style="{ width: widget.width }"
        type="textarea"
      />
    </template>

    <template v-if="widget.type == 'number'">
      <el-input-number
        v-model="dataModel"
        :style="{ width: widget.width }"
        :step="widget.step"
        :disabled="disabled || widget.disabled"
        controls-position="right"
      />
    </template>

    <template v-if="widget.type == 'radio'">
      <el-radio-group
        v-model="dataModel"
        :style="{ width: widget.width }"
        :disabled="disabled || widget.disabled"
      >
        <el-radio
          v-for="(item, index) in widget.options"
          :key="index"
          :label="widget.props ? item[widget.props.value] : item.value"
        >
          <template v-if="widget.remote">{{ item.label }}</template>
          <template v-else>{{ widget.props ? item[widget.props.label] : item.label }}</template>
        </el-radio>
      </el-radio-group>
    </template>

    <template v-if="widget.type == 'checkbox'">
      <el-checkbox-group
        v-model="dataModel"
        :style="{ width: widget.width }"
        :disabled="disabled || widget.disabled"
      >
        <el-checkbox v-for="(item, index) in widget.options" :key="index" :label="item.value">
          <template v-if="widget.remote">{{ item.label }}</template>
          <template v-else>{{ item.value }}</template>
        </el-checkbox>
      </el-checkbox-group>
    </template>

    <template v-if="widget.type == 'time'">
      <el-time-picker
        v-model="dataModel"
        :is-range="widget.isRange"
        :placeholder="widget.placeholder"
        :start-placeholder="widget.startPlaceholder"
        :end-placeholder="widget.endPlaceholder"
        :readonly="widget.readonly"
        :disabled="disabled || widget.disabled"
        :editable="widget.editable"
        :clearable="widget.clearable"
        :arrow-control="widget.arrowControl"
        :value-format="widget.format"
        :style="{ width: widget.width }"
      />
    </template>

    <template v-if="widget.type == 'date'">
      <el-date-picker
        v-model="dataModel"
        :type="widget.dateType"
        :placeholder="widget.placeholder"
        :start-placeholder="widget.startPlaceholder"
        :end-placeholder="widget.endPlaceholder"
        :readonly="widget.readonly"
        :disabled="disabled || widget.disabled"
        :editable="widget.editable"
        :clearable="widget.clearable"
        :value-format="widget.timestamp ? 'timestamp' : widget.format"
        :format="widget.format"
        :picker-options="widget.pickerOptions"
        :style="{ width: widget.width }"
      />
    </template>

    <template v-if="widget.type == 'rate'">
      <el-rate
        v-model="dataModel"
        :max="widget.max"
        :disabled="disabled || widget.disabled"
        :allow-half="widget.allowHalf"
      />
    </template>

    <template v-if="widget.type == 'color'">
      <el-color-picker
        v-model="dataModel"
        :disabled="disabled || widget.disabled"
        :show-alpha="widget.showAlpha"
      />
    </template>

    <template v-if="widget.type == 'select'">
      <el-select
        v-model="dataModel"
        :disabled="disabled || widget.disabled"
        :multiple="widget.multiple"
        :clearable="widget.clearable"
        :placeholder="widget.placeholder"
        :style="{ width: widget.width }"
        :filterable="widget.filterable"
      >
        <el-option
          v-for="item in widget.options"
          :key="widget.props ? item[widget.props.value] : item.value"
          :value="widget.props ? item[widget.props.value] : item.value"
          :label="widget.props ? item[widget.props.label] : item.label"
        />
      </el-select>
    </template>

    <template v-if="widget.type == 'switch'">
      <el-switch v-model="dataModel" :disabled="disabled || widget.options.disabled" />
    </template>

    <template v-if="widget.type == 'slider'">
      <el-slider
        v-model="dataModel"
        :min="widget.min"
        :max="widget.max"
        :disabled="disabled || widget.disabled"
        :step="widget.step"
        :show-input="widget.showInput"
        :range="widget.range"
        :style="{ width: widget.width }"
      />
    </template>

    <template v-if="widget.type == 'cascader'">
      <el-cascader
        v-model="dataModel"
        :disabled="disabled || widget.disabled"
        :clearable="widget.clearable"
        :placeholder="widget.placeholder"
        :style="{ width: widget.width }"
        :options="widget.options"
        :props="widget.props"
      />
    </template>

    <template v-if="widget.type == 'text'">
      <span>{{ dataModel }}</span>
    </template>
  </el-form-item>
</template>

<script>
export default {
  props: {
    widget: {
      type: Object,
      default() {
        return {}
      }
    },
    models: {
      type: Object,
      default() {
        return {}
      }
    },
    remote: {
      type: Object,
      default() {
        return {}
      }
    },
    rules: {
      type: Array,
      default() {
        return []
      }
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      dataModel: this.models[this.widget.key]
    }
  },
  watch: {
    dataModel: {
      deep: true,
      immediate: true,
      handler(val) {
        this.models[this.widget.key] = val
        this.$emit('update:models', {
          ...this.models,
          [this.widget.key]: val
        })
        this.$emit('input-change', val, this.widget.key)
      }
    },
    models: {
      deep: true,
      immediate: true,
      handler(val) {
        this.dataModel = val[this.widget.key]
      }
    }
  },
  created() {
    if (this.widget.remote && this.remote[this.widget.remoteFunc]) {
      this.remote[this.widget.remoteFunc](data => {
        this.widget.options = data
      })
    }
  }
}
</script>
