function getStorys() {
    const myTable = $('#my-table').DataTable({
        processing: true,
        serverSide: true,
        ajax: {
            type: 'GET',
            url: '/api/stories',
            dataSrc: function (json) {
                return json.data;
            },
        },
        columns: [
            { data: null, defaultContent: "", className: "sttColumn" },
            { data: 'name' },
            {
                data: 'thumbnail',
                render: function (data, type, row) {
                    return `<img src="/client/static/image/img_anime/${data}" width=100 height=100 >`;
                },
            },
            { data: 'category' },
            { data: 'chapter' },
            { data: 'author' },
            {
                data: 'id',
                className: "center",
                render: function (data, type, row) {
                    return `<span>
                                <a href="/admin/manage/edit/${data}" class="edit" data-toggle="tooltip" data-placement="top"
                                    title="Edit"><i class="fa fa-pencil color-muted m-r-5"></i>
                                </a>
                                
                                <a href="#" class="remove" data-toggle="modal" data-target="#basicModal" 
                                    title="Close"><i class="fa fa-close color-danger"></i>
                                </a>
                            </span>`;
                },
            },
        ],
        columnDefs: [
            {
                searchable: false,
                orderable: false,
                targets: 0,
            },
            {
                searchable: false,
                orderable: false,
                targets: [0, 2, 6],
            },
        ],
        fnRowCallback: function (nRow, aData, iDisplayIndex) {
            var oSettings = this.fnSettings();
            $("td:first", nRow).html(oSettings._iDisplayStart + iDisplayIndex + 1);
            return nRow;
        },
        language: {
            sProcessing: "??ang x??? l??...",
            sLengthMenu: "Ch???n s??? b???n ghi hi???n th??? tr??n m???t trang _MENU_",
            sZeroRecords: "Kh??ng c?? d??? li???u ????? hi???n th???.",
            sInfo: "Hi???n th??? t??? _START_ ?????n _END_ trong t???ng s??? _TOTAL_",
            sInfoEmpty: "Hi???n th??? t??? 0 ?????n 0 trong t???ng s??? 0 m???c",
            sInfoFiltered: "(???????c l???c t??? _MAX_ b???n ghi)",
            sInfoPostFix: "",
            sSearch: "T??m ki???m:",
            sUrl: "",
            oPaginate: {
                sFirst: "?????u",
                sPrevious: "Tr?????c",
                sNext: "Ti???p",
                sLast: "Cu???i",
            },
        }
    });
}

function deleteStory() {
    var table = $('#my-table').DataTable();

    $('#my-table tbody').on('click', 'a.remove', function () {
        const story = table.row($(this).parents('tr')).data();

        $('#remove-confirm').on('click', function () {
            $.ajax({
                url: `/api/stories/${story.id}`,
                type: 'DELETE',
                success: function (res) {
                    if (res.status == 'success') {
                        $('#basicModal').modal('hide');
                        toastr.success('X??a th??nh c??ng');
                        table.ajax.reload();
                        return;
                    } else {
                        $('#basicModal').modal('hide');
                        table.ajax.reload();
                        toastr.error('X??a kh??ng th??nh c??ng');
                        return;
                    }
                },
                error: function () {
                    $('#basicModal').modal('hide');
                    toastr.error('X??a kh??ng th??nh c??ng');
                }
            });
        })
    });
}

getStorys();
deleteStory();